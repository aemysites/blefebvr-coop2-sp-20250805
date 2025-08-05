/* global WebImporter */
export default function parse(element, { document }) {
  // The header row must be a single cell, matching the example
  const headerRow = ['Columns (columns5)'];

  // Get both columns: image, then text
  const columns = Array.from(element.querySelectorAll(':scope > div.col-xs-12'));
  if (columns.length < 2) return;
  const imageCol = columns[0];
  const textCol = columns[1];

  // LEFT COLUMN (image with overlay text)
  let imageFigure = imageCol.querySelector('figure');
  let leftCell;
  if (imageFigure) {
    leftCell = [imageFigure];
  } else {
    leftCell = Array.from(imageCol.childNodes).filter(n => n.nodeType === 1 || (n.nodeType === 3 && n.textContent.trim()));
  }

  // RIGHT COLUMN (all text, heading, link)
  const rightCell = [];
  const article = textCol.querySelector('article');
  if (article) rightCell.push(article);
  const linkcontainer = textCol.querySelector('.KBK-014-link');
  if (linkcontainer) {
    Array.from(linkcontainer.childNodes).forEach(node => {
      if ((node.nodeType === 1 && (node.tagName === 'A' || node.textContent.trim())) || (node.nodeType === 3 && node.textContent.trim())) {
        rightCell.push(node);
      }
    });
  }
  if (rightCell.length === 0) {
    Array.from(textCol.childNodes).forEach(node => {
      if (node.nodeType === 1 || (node.nodeType === 3 && node.textContent.trim())) {
        rightCell.push(node);
      }
    });
  }

  // The cells array: header is always a single cell, then the data row has two cells
  const cells = [
    headerRow, // single-column header
    [leftCell, rightCell] // one row, two columns
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
