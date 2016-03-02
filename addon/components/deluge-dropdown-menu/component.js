import Ember from 'ember';
import layout from './template';
import ControlState from '../../mixins/control-state';
import KeyBindings from '../../mixins/key-bindings';

const { run: { later }} = Ember;

export default Ember.Component.extend(ControlState, KeyBindings, {
  layout: layout,

  tagName: 'deluge-dropdown-menu',

  classNames: ['deluge-dropdown-menu'],

  attributeBindings: [
    'autocomplete:aria-autocomplete',
  ],

  autocomplete: 'none',

  isOpen: false,

  ignoreSelect: false,

  /**
   * Controls the rendering of the wormhole. If set to true,
   * disables the wormhole.
   *
   * @type {Boolean}
   */
  renderInPlace: false,

  multiple: false,

  keyBindings: {
    'esc': 'close',
    'up': 'open',
    'down': 'open',
  },

  didInsertElement() {
    this.addGlobalEventHandlers();
  },

  willDestroyElement() {
    this.removeGlobalEventHandlers();
  },

  addGlobalEventHandlers() {
    document.addEventListener('click', this.handleRootClick.bind(this));
  },

  removeGlobalEventHandlers() {
    document.removeEventListener('click', this.handleRootClick.bind(this));
  },

  handleRootClick(event) {
    if (this.element && !this.element.contains(event.target)) {
      this.close();
    }
  },

  /**
   * Indicates the currently selected items, by value.
   *
   * @readOnly
   * @type {Array}
   */
  selection: Ember.A(),

  open() {
    this.set('isOpen', true);
    // const menuButton = this.get('button');
    // if (!menuButton) { return; }
    // menuButton.send('open');
  },

  close() {
    this.set('isOpen', false);
    // const menuButton = this.get('button');
    // if (!menuButton) { return; }
    // menuButton.send('close');
  },

  click({target}) {
    if (target === this.element) {
      this.open();
    }
  },

  actions: {
    open() {
      this.open();
    },

    itemSelected(values) {
      this.sendAction('action', values);
      if (!this.get('ignoreSelect')) {
        // later(this, this.close, 125);
      }
    },
  }
});
