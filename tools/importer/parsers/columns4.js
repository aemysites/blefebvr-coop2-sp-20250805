/* global WebImporter */
export default function parse(element, { document }) {
  // Find the row containing the columns
  const row = element.querySelector('.row.bild-text--row-flex');
  if (!row) return;
  // Get the immediate children (columns)
  const columns = Array.from(row.querySelectorAll(':scope > div'));
  if (columns.length < 2) return;
  // Reference the left image column
  const leftCol = columns[0];
  // Reference the right text column (including product text and link)
  const rightCol = columns[1];

  // The header row must have exactly one cell
  const headerRow = ['Columns (columns4)'];
  // The second row must have two cells for the actual columns
  const dataRow = [leftCol, rightCol];

  const cells = [headerRow, dataRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
