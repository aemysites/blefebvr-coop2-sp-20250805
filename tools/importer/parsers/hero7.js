/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Get background image URL (prefer desktop/largest version, fallback to others)
  let bgUrl = element.getAttribute('data-bgimage-lg') ||
    element.getAttribute('data-bgimage-md') ||
    element.getAttribute('data-bgimage-sm') ||
    element.getAttribute('data-bgimage-xs');
  if (!bgUrl) {
    // fallback: try to get from inline style
    const style = element.getAttribute('style') || '';
    const match = style.match(/background-image:\s*url\(['\"]?([^'\"]+)['\"]?\)/);
    if (match && match[1]) {
      bgUrl = match[1];
    }
  }
  // 2. Create <img> element for the background image, only if there is a URL
  let imageEl = null;
  if (bgUrl) {
    imageEl = document.createElement('img');
    imageEl.src = bgUrl;
    imageEl.alt = '';
  }
  // 3. Gather content elements: headings, paragraphs, CTA
  const article = element.querySelector('article');
  const contentEls = [];
  if (article) {
    // Title (h2)
    const h2 = article.querySelector('h2');
    if (h2) contentEls.push(h2);
    // Subheading (h3)
    const h3 = article.querySelector('h3');
    if (h3) contentEls.push(h3);
    // Paragraph
    const p = article.querySelector('p');
    if (p) contentEls.push(p);
    // CTA (a), reference only the <a>, not its children separately
    const cta = article.querySelector('.KBK-024-call-to-action-button-small a');
    if (cta) contentEls.push(cta);
  }
  // 4. Build the cells array matching the structure in the example: 1 col, 3 rows
  const cells = [];
  // First row: header
  cells.push(['Hero (hero7)']);
  // Second row: background image
  if (imageEl) {
    cells.push([imageEl]);
  } else {
    cells.push(['']);
  }
  // Third row: all content elements in a single cell as array (if any)
  if (contentEls.length) {
    cells.push([contentEls]);
  } else {
    cells.push(['']);
  }
  // 5. Create the table and replace the original element
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
