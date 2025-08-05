/* global WebImporter */
export default function parse(element, { document }) {
  // Get all immediate .footer-col divs (columns)
  const columns = Array.from(element.querySelectorAll(':scope > div.footer-col'));

  // For each column, use the <ul> as the column content
  const cells = columns.map(col => {
    const ul = col.querySelector('ul');
    return ul || document.createElement('span');
  });

  // Build the correct structure: header row is a single cell, second row is all columns
  const table = WebImporter.DOMUtils.createTable([
    ['Columns (columns10)'], // Header: single cell
    cells // Content: one cell per column
  ], document);

  element.replaceWith(table);
}