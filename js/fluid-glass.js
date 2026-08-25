/**
 * FluidGlass - Interactive Refractive WebGL Glass Overlay
 */

(function () {
  const vertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = vec4(position, 1.0);
    }
  `;

  const fragmentShader = `
    uniform float uTime;
    uniform vec2 uResolution;
    uniform vec2 uMouse;
    uniform float uIntensity;
    uniform vec3 uTint;
    varying vec2 vUv;

    void main() {
      vec2 uv = gl_FragCoord.xy / uResolution.xy;
      vec2 aspect = vec2(uResolution.x / uResolution.y, 1.0);
      
      vec2 mouseUv = uMouse;
      vec2 p = (uv - mouseUv) * aspect;
      float dist = length(p);
      
      float radius = 0.38;
      float strength = uIntensity * smoothstep(radius, 0.0, dist);
      
      float wave = sin(dist * 20.0 - uTime * 2.5) * 0.015 * smoothstep(radius * 1.2, 0.0, dist);
      vec2 offset = normalize(p + 1e-4) * (strength * 0.09 + wave);
      
      float rDist = length((uv + offset * 1.15 - mouseUv) * aspect);
      float gDist = length((uv + offset * 1.00 - mouseUv) * aspect);
      float bDist = length((uv + offset * 0.85 - mouseUv) * aspect);
      
      float lensR = smoothstep(radius, 0.02, rDist);
      float lensG = smoothstep(radius, 0.02, gDist);
      float lensB = smoothstep(radius, 0.02, bDist);
      
      float rim = pow(1.0 - smoothstep(radius - 0.06, radius, dist), 3.0) * smoothstep(radius - 0.14, radius - 0.02, dist);
      
      vec3 glassColor = uTint * (lensB * 0.3 + rim * 0.85);
      glassColor += vec3(0.08, 0.55, 0.95) * lensG * 0.25;
      glassColor += vec3(0.35, 0.85, 1.0) * rim * 0.55;
      
      float ambientWave = (sin(uv.x * 3.5 + uTime * 0.5) * cos(uv.y * 3.0 + uTime * 0.4)) * 0.035;
      glassColor += uTint * max(0.0, ambientWave);
      
      float alpha = clamp(lensG * 0.25 + rim * 0.65 + max(0.0, ambientWave) * 1.2, 0.0, 0.85);
      
      gl_FragColor = vec4(glassColor, alpha);
    }
  `;

  function initFluidGlass() {
    const overlays = document.querySelectorAll('.fluid-glass-overlay');
    if (overlays.length === 0 || typeof THREE === 'undefined') return;

    overlays.forEach(container => {
      const scene = new THREE.Scene();
      const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      container.appendChild(renderer.domElement);

      const tintHex = container.dataset.tint || '#20B8FF';
      const intensity = parseFloat(container.dataset.intensity || '0.45');
      const tintCol = new THREE.Color(tintHex);

      const uniforms = {
        uTime: { value: 0 },
        uResolution: { value: new THREE.Vector2(1, 1) },
        uMouse: { value: new THREE.Vector2(0.5, 0.5) },
        uIntensity: { value: intensity },
        uTint: { value: new THREE.Vector3(tintCol.r, tintCol.g, tintCol.b) }
      };

      const material = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms,
        transparent: true,
        depthWrite: false
      });

      const geometry = new THREE.PlaneGeometry(2, 2);
      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);

      const targetMouse = new THREE.Vector2(0.5, 0.5);
      const currentMouse = new THREE.Vector2(0.5, 0.5);

      function resize() {
        const w = container.clientWidth || 1;
        const h = container.clientHeight || 1;
        renderer.setSize(w, h, false);
        uniforms.uResolution.value.set(renderer.domElement.width, renderer.domElement.height);
      }
      resize();
      window.addEventListener('resize', resize, { passive: true });

      const parentSection = container.closest('section') || container;
      parentSection.addEventListener('pointermove', (e) => {
        const rect = container.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = 1.0 - (e.clientY - rect.top) / rect.height;
        targetMouse.set(x, y);
      }, { passive: true });

      const clock = new THREE.Clock();
      function animate() {
        uniforms.uTime.value = clock.getElapsedTime();
        currentMouse.lerp(targetMouse, 0.08);
        uniforms.uMouse.value.copy(currentMouse);
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
      }
      animate();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFluidGlass);
  } else {
    initFluidGlass();
  }
})();
