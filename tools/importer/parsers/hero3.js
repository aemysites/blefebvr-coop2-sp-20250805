/* global WebImporter */
export default function parse(element, { document }) {
  // Header row with the exact block name
  const headerRow = ['Hero (hero3)'];

  // Second row: background image (none present, so empty string)
  const imageRow = [''];

  // Third row: main hero content. In this HTML it's the <article> containing h1 and <p>
  // Reference the existing DOM node directly if possible
  let contentNode = element.querySelector('article');
  if (!contentNode) {
    // Fallback in case structure changes: wrap any h1/p found in a div
    const h1 = element.querySelector('h1');
    const p = element.querySelector('p');
    if (h1 || p) {
      const div = document.createElement('div');
      if (h1) div.appendChild(h1);
      if (p) div.appendChild(p);
      contentNode = div;
    } else {
      // No recognizable content
      contentNode = document.createTextNode('');
    }
  }

  const contentRow = [contentNode];

  const cells = [
    headerRow,
    imageRow,
    contentRow,
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
