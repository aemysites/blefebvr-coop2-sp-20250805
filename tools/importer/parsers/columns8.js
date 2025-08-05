/* global WebImporter */
export default function parse(element, { document }) {
  // Find the row containing the columns
  const row = element.querySelector('.row');
  // Get all column divs (immediate children of row with col- classes)
  const colDivs = row ? Array.from(row.children) : [];

  // Each colDiv contains an article with a wrapper, which contains an anchor with h3, p, button
  // We want to preserve the content for each column
  const cells = colDivs.map((col) => {
    const wrapper = col.querySelector('.wrapper');
    return wrapper;
  });

  // The header row must be a single cell, matching the example: ['Columns (columns8)']
  // The second row is the columns, one cell per column
  const tableRows = [
    ['Columns (columns8)'], // header row: single cell
    cells // second row: as many cells as columns
  ];

  const table = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(table);
}