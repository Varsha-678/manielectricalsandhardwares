/**
 * GooeyNav - Vanilla JavaScript Navigation with Organic Fluid Indicator & Particle Bursts
 */

(function () {
  function initGooeyNav() {
    const container = document.querySelector('.gooey-nav-container');
    if (!container) return;

    const nav = container.querySelector('nav');
    const filterRef = container.querySelector('.effect.filter');
    const textRef = container.querySelector('.effect.text');
    const listItems = Array.from(container.querySelectorAll('nav ul li'));

    if (!nav || !filterRef || !textRef || listItems.length === 0) return;

    const animationTime = 600;
    const particleCount = 14;
    const particleDistances = [90, 10];
    const particleR = 100;
    const timeVariance = 300;
    const colors = [1, 2, 3, 1, 2, 3, 4];

    // Determine initial active index from URL
    const currentPath = window.location.pathname;
    let activeIndex = 0;
    if (currentPath.includes('products')) {
      const pIndex = listItems.findIndex(li => li.querySelector('a')?.getAttribute('href')?.includes('products'));
      if (pIndex !== -1) activeIndex = pIndex;
    }

    function noise(n = 1) {
      return n / 2 - Math.random() * n;
    }

    function getXY(distance, pointIndex, totalPoints) {
      const angle = ((360 + noise(8)) / totalPoints) * pointIndex * (Math.PI / 180);
      return [distance * Math.cos(angle), distance * Math.sin(angle)];
    }

    function createParticle(i, t, d, r) {
      const rot = noise(r / 10);
      return {
        start: getXY(d[0], particleCount - i, particleCount),
        end: getXY(d[1] + noise(7), particleCount - i, particleCount),
        time: t,
        scale: 1 + noise(0.2),
        color: colors[Math.floor(Math.random() * colors.length)],
        rotate: rot > 0 ? (rot + r / 20) * 10 : (rot - r / 20) * 10
      };
    }

    function makeParticles(element) {
      const d = particleDistances;
      const r = particleR;
      const bubbleTime = animationTime * 2 + timeVariance;
      element.style.setProperty('--time', `${bubbleTime}ms`);

      for (let i = 0; i < particleCount; i++) {
        const t = animationTime * 2 + noise(timeVariance * 2);
        const p = createParticle(i, t, d, r);
        element.classList.remove('active');

        setTimeout(() => {
          const particle = document.createElement('span');
          const point = document.createElement('span');
          particle.classList.add('particle');
          particle.style.setProperty('--start-x', `${p.start[0]}px`);
          particle.style.setProperty('--start-y', `${p.start[1]}px`);
          particle.style.setProperty('--end-x', `${p.end[0]}px`);
          particle.style.setProperty('--end-y', `${p.end[1]}px`);
          particle.style.setProperty('--time', `${p.time}ms`);
          particle.style.setProperty('--scale', `${p.scale}`);
          particle.style.setProperty('--color', `var(--color-${p.color}, #20B8FF)`);
          particle.style.setProperty('--rotate', `${p.rotate}deg`);

          point.classList.add('point');
          particle.appendChild(point);
          element.appendChild(particle);

          requestAnimationFrame(() => {
            element.classList.add('active');
          });

          setTimeout(() => {
            try {
              if (particle.parentElement === element) {
                element.removeChild(particle);
              }
            } catch (err) {
              // Ignore cleanup race
            }
          }, t);
        }, 30);
      }
    }

    function updateEffectPosition(element) {
      const containerRect = container.getBoundingClientRect();
      const pos = element.getBoundingClientRect();

      const styles = {
        left: `${pos.x - containerRect.x}px`,
        top: `${pos.y - containerRect.y}px`,
        width: `${pos.width}px`,
        height: `${pos.height}px`
      };

      Object.assign(filterRef.style, styles);
      Object.assign(textRef.style, styles);
      textRef.innerText = element.innerText.trim();
    }

    function setActive(index, triggerParticles = true) {
      listItems.forEach((li, idx) => {
        if (idx === index) {
          li.classList.add('active');
        } else {
          li.classList.remove('active');
        }
      });

      const activeLi = listItems[index];
      if (activeLi) {
        updateEffectPosition(activeLi);
        textRef.classList.remove('active');
        void textRef.offsetWidth;
        textRef.classList.add('active');

        if (triggerParticles) {
          const oldParticles = filterRef.querySelectorAll('.particle');
          oldParticles.forEach(p => p.remove());
          makeParticles(filterRef);
        }
      }
      activeIndex = index;
    }

    // Bind click events on nav items
    listItems.forEach((li, index) => {
      li.addEventListener('click', (e) => {
        const link = li.querySelector('a');
        const href = link?.getAttribute('href') || '';
        
        setActive(index, true);

        // If on same page hash link, smooth scroll
        if (href.startsWith('#') || href.startsWith('/#')) {
          const targetId = href.replace('/#', '').replace('#', '');
          const targetEl = document.getElementById(targetId);
          if (targetEl) {
            e.preventDefault();
            targetEl.scrollIntoView({ behavior: 'smooth' });
          }
        }
      });
    });

    // Set initial position
    setActive(activeIndex, false);

    // Update position on resize
    window.addEventListener('resize', () => {
      if (listItems[activeIndex]) {
        updateEffectPosition(listItems[activeIndex]);
      }
    }, { passive: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGooeyNav);
  } else {
    initGooeyNav();
  }
})();
