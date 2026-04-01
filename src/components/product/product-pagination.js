

const ProductPagination = (() => {

  function render() {
    const root = document.getElementById('pagination-root');
    if (!root) return;
    root.innerHTML = `<div class="pagination" id="pagination-inner"></div>`;
  }

  function update(currentPage, totalPages) {
    const inner = document.getElementById('pagination-inner');
    if (!inner || totalPages <= 1) {
      if (inner) inner.innerHTML = '';
      return;
    }

    const pages = [];

    // Prev button
    pages.push(`
      <button class="page-btn" onclick="ProductGrid.goToPage(${currentPage - 1})"
        ${currentPage === 1 ? 'disabled' : ''}>
        <i class="fa-solid fa-chevron-left" style="font-size:0.75rem;"></i>
      </button>`);

    // Page numbers
    const range = getPageRange(currentPage, totalPages);
    range.forEach(p => {
      if (p === '...') {
        pages.push(`<span style="padding:0 4px;color:var(--text-light);">…</span>`);
      } else {
        pages.push(`
          <button class="page-btn ${p === currentPage ? 'active' : ''}"
            onclick="ProductGrid.goToPage(${p})">
            ${p}
          </button>`);
      }
    });

    // Next button
    pages.push(`
      <button class="page-btn" onclick="ProductGrid.goToPage(${currentPage + 1})"
        ${currentPage === totalPages ? 'disabled' : ''}>
        <i class="fa-solid fa-chevron-right" style="font-size:0.75rem;"></i>
      </button>`);

    inner.innerHTML = pages.join('');
  }

  function getPageRange(current, total) {
    if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
    if (current <= 4) return [1, 2, 3, 4, 5, '...', total];
    if (current >= total - 3) return [1, '...', total-4, total-3, total-2, total-1, total];
    return [1, '...', current-1, current, current+1, '...', total];
  }

  return { render, update };
})();

ProductPagination.render();