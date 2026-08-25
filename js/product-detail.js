/**
 * Product Detail Page - Vanilla JS Dynamic Loader
 */

(function () {
  function initProductDetailPage() {
    const container = document.getElementById('productDetailContainer');
    const notFound = document.getElementById('productNotFound');

    if (!container || !window.ManiData) return;

    const { products, business } = window.ManiData;
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    const product = products.find(p => p.id === productId);

    if (!product) {
      if (container) container.style.display = 'none';
      if (notFound) notFound.style.display = 'block';
      return;
    }

    if (notFound) notFound.style.display = 'none';
    if (container) container.style.display = 'block';

    // Update document title
    document.title = `${product.name} | ${business.name}`;

    // Fill elements
    const brandEl = document.getElementById('detailBrand');
    const nameEl = document.getElementById('detailName');
    const catEl = document.getElementById('detailCategory');
    const descEl = document.getElementById('detailDescription');
    const imageEl = document.getElementById('detailImage');
    const iconWrapEl = document.getElementById('detailIconWrap');
    const specsContainer = document.getElementById('detailSpecsContainer');
    const specsTbody = document.getElementById('detailSpecsTableBody');
    const waBtn = document.getElementById('detailWhatsAppBtn');
    const callBtn = document.getElementById('detailCallBtn');

    if (brandEl) brandEl.textContent = product.brand;
    if (nameEl) nameEl.textContent = product.name;
    if (catEl) catEl.textContent = product.category;
    if (descEl) descEl.textContent = product.description;

    if (imageEl && product.image) {
      imageEl.src = product.image;
      imageEl.alt = product.name;
      imageEl.style.display = 'block';
      if (iconWrapEl) iconWrapEl.style.display = 'none';
    } else if (iconWrapEl) {
      iconWrapEl.style.display = 'flex';
      if (imageEl) imageEl.style.display = 'none';
    }

    if (specsContainer && specsTbody) {
      const specs = product.specifications;
      if (specs && Object.keys(specs).length > 0) {
        specsContainer.style.display = 'block';
        specsTbody.innerHTML = Object.entries(specs).map(([key, value]) => `
          <tr>
            <td>${key}</td>
            <td>${value}</td>
          </tr>
        `).join('');
      } else {
        specsContainer.style.display = 'none';
      }
    }

    if (waBtn) {
      const waMsg = `Hi, I'm interested in: ${product.name} (${product.brand}). Please share pricing and availability.`;
      waBtn.href = business.whatsappUrl(waMsg);
    }

    if (callBtn) {
      callBtn.href = `tel:${business.phone}`;
    }

    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initProductDetailPage);
  } else {
    initProductDetailPage();
  }
})();
