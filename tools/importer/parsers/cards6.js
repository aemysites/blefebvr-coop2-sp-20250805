/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get the teaser from a column
  function getTeaserDiv(col) {
    const teaser = col.querySelector('.teaser');
    return teaser || col;
  }

  const headerRow = ['Cards'];
  const rows = [];

  // Get all card columns
  const cardCols = element.querySelectorAll('.row-flex > .col-xs-12');
  cardCols.forEach(col => {
    const teaserDiv = getTeaserDiv(col);
    // Image (mandatory): find first <img> in .wrapper
    let imageEl = null;
    const wrapper = teaserDiv.querySelector('.wrapper');
    if (wrapper) {
      const img = wrapper.querySelector('img');
      if (img) imageEl = img;
    }
    // Title: <h3 class="hl"> inside .teaser-headlines
    let titleEl = null;
    const headline = teaserDiv.querySelector('.teaser-headlines .hl');
    if (headline) {
      titleEl = document.createElement('strong');
      titleEl.textContent = headline.textContent;
    }
    // Description: <p> inside .txt-container
    let descEl = null;
    const descP = teaserDiv.querySelector('.txt-container p');
    if (descP) {
      descEl = descP;
    }
    // CTA: First <a> in .KBK-014-link in the column (not teaserDiv, to avoid anchor-wrapped variant)
    let ctaEl = null;
    const ctaLink = col.querySelector('.KBK-014-link a');
    if (ctaLink) ctaEl = ctaLink;
    // Compose the text cell: [title, desc, cta], preserving order
    const textCell = [];
    if (titleEl) textCell.push(titleEl);
    if (descEl) {
      if (textCell.length > 0) textCell.push(document.createElement('br'));
      textCell.push(descEl);
    }
    if (ctaEl) {
      textCell.push(document.createElement('br'));
      textCell.push(ctaEl);
    }
    // Build row: [image, textCell]
    rows.push([imageEl, textCell]);
  });

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);
  element.replaceWith(table);
}
