/* global WebImporter */
export default function parse(element, { document }) {
  // Extract tab labels and their data-targets
  const tabLabels = [];
  const tabTargets = [];
  const nav = element.querySelector('#lvl-1-navi ul.nav.navbar-nav');
  if (nav) {
    nav.querySelectorAll('li > a[data-target]').forEach(a => {
      const label = a.textContent.trim();
      const dataTarget = a.getAttribute('data-target');
      if (label && dataTarget) {
        tabLabels.push(label);
        tabTargets.push(dataTarget);
      }
    });
  }

  // For each tab, get the corresponding content block from the teaser container
  const teaserContainer = element.querySelector('#teaser-container');
  const tabContents = tabTargets.map(target => {
    let contentElem = null;
    if (teaserContainer) {
      contentElem = teaserContainer.querySelector(`#${target}-teaser`);
    }
    if (!contentElem) {
      contentElem = document.createElement('div');
    }
    return contentElem;
  });

  // The header row must be a single cell with 'Tabs' exactly
  const cells = [
    ['Tabs'],
    tabLabels,
    tabContents
  ];
  
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
