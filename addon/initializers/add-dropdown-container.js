/*globals document */
const hasDOM = typeof document !== 'undefined';

function appendContainerElement(rootElementId, id) {
  if (!hasDOM) { return; }

  const rootEl = document.querySelector(rootElementId);
  const modalContainerEl = document.createElement('div');
  modalContainerEl.id = id;
  rootEl.appendChild(modalContainerEl);
}

export function initialize(application) {
  const delugeDropdown = application.delugeDropdown || {};
  const dropdownContainerElId = delugeDropdown.dropdownRootElementId || 'deluge-dropdown-container';

  application.register('config:deluge-dropdown-container-id',
                       dropdownContainerElId,
                       { instantiate: false });

  application.inject('service:deluge-dropdown',
                     'destinationElementId',
                     'config:deluge-dropdown-container-id');

  appendContainerElement(application.rootElement, dropdownContainerElId);
}

export default {
  name: 'add-dropdown-container',
  initialize
};
