/**
 * Products Catalogue - Vanilla JS Filtering and Search Controller
 */

(function () {
  function initProductsPage() {
    const searchInput = document.getElementById('productSearchInput');
    const filterPillsContainer = document.getElementById('filterPillsContainer');
    const productGrid = document.getElementById('productGrid');
    const noResults = document.getElementById('noResultsMessage');

    if (!productGrid || !window.ManiData) return;

    const { products, categories, business } = window.ManiData;
    let currentCategory = 'All';
    let currentQuery = '';

    // Render filter pills
    if (filterPillsContainer) {
      filterPillsContainer.innerHTML = categories.map(cat => `
        <button class="pill${cat === currentCategory ? ' active' : ''}" data-category="${cat}">
          ${cat}
        </button>
      `).join('');

      filterPillsContainer.querySelectorAll('.pill').forEach(btn => {
        btn.addEventListener('click', () => {
          filterPillsContainer.querySelectorAll('.pill').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          currentCategory = btn.dataset.category;
          renderProducts();
        });
      });
    }

    // Search input handler
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        currentQuery = e.target.value.toLowerCase().trim();
        renderProducts();
      });
    }

    function renderProducts() {
      const filtered = products.filter(p => {
        const matchCat = currentCategory === 'All' || p.category === currentCategory;
        const matchQ = !currentQuery ||
          p.name.toLowerCase().includes(currentQuery) ||
          p.brand.toLowerCase().includes(currentQuery) ||
          p.description.toLowerCase().includes(currentQuery);
        return matchCat && matchQ;
      });

      if (filtered.length === 0) {
        productGrid.innerHTML = '';
        if (noResults) noResults.style.display = 'block';
        return;
      }

      if (noResults) noResults.style.display = 'none';

      productGrid.innerHTML = filtered.map(p => {
        const waMsg = `Hi, I'd like to enquire about: ${p.name} (${p.brand})`;
        const waLink = business.whatsappUrl(waMsg);

        return `
          <div class="product-card fade-up visible">
            <div class="product-card-img">
              ${p.image ? `<img src="${p.image}" alt="${p.name}" class="product-real-img" loading="lazy" />` : `<div class="product-card-icon-wrap"><i data-lucide="zap" style="width: 22px; height: 22px;"></i></div>`}
              <span class="product-card-category-badge">${p.category}</span>
            </div>
            <div class="product-card-body">
              <span class="product-brand">${p.brand}</span>
              <h3 class="product-name">${p.name}</h3>
              <p class="product-desc">${p.description.length > 90 ? p.description.slice(0, 90) + '…' : p.description}</p>
              <p class="product-price">Price: Visit Store</p>
              <div class="product-actions">
                <a href="product-detail.html?id=${p.id}" class="btn btn-outline btn-sm" style="flex: 1; justify-content: center;">
                  Details <i data-lucide="arrow-right" style="width: 14px; height: 14px;"></i>
                </a>
                <a href="${waLink}" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm" aria-label="Enquire on WhatsApp for ${p.name}" style="color: var(--blue-electric); border-color: var(--border-medium);">
                  <i data-lucide="message-circle" style="width: 14px; height: 14px;"></i>
                </a>
              </div>
            </div>
          </div>
        `;
      }).join('');

      if (window.lucide) {
        window.lucide.createIcons();
      }
    }

    // Initial render
    renderProducts();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initProductsPage);
  } else {
    initProductsPage();
  }
})();
