import Ember from 'ember';
import layout from './template';
import Registry from '../../mixins/registry';
import ControlState from '../../mixins/control-state';
import KeyBindings from '../../mixins/key-bindings';

export default Ember.Component.extend(Registry, ControlState, KeyBindings, {
  layout: layout,

  tagName: 'deluge-dropdown-menu',

  classNames: ['deluge-dropdown-menu'],

  attributeBindings: [
    'autocomplete:aria-autocomplete',
  ],

  autocomplete: 'none',

  /**
   * Indicates that we will handle the default action of a child element
   *
   * @type {Boolean}
   */
  acceptsChildActions: true,

  /**
   * Name of the action which handles the item activate action
   *
   * @type {String}
   */
  childActionName: 'itemSelected',

  keyBindings: {
    'esc': 'close',
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
    if (!this.element.contains(event.target)) {
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
    const menuButton = this.get('button');
    if (!menuButton) { return; }
    menuButton.send('open');
  },

  close() {
    const menuButton = this.get('button');
    if (!menuButton) { return; }
    menuButton.send('close');
  },

  // focusOut() {
  //   const button = this.get('button');
  //   if (!button) { return; }
  //   Ember.run.next(this, function(){
  //     if (button.$().has(document.activeElement).length === 0) {
  //       button.send("close");
  //     }
  //   });
  // },

  actions: {
    itemSelected(values) {
      console.log('[dropdown-menu] item selected', values);

      this.sendAction('selection-changed', values);

      Ember.run.later(this, this.close, 125);
    },

    registerButton(buttonComponent) {
      this.set('button', buttonComponent);

      console.log('>',this.get('selection'));

      // buttonComponent.set('selection', this.get('selection'));
    },

    deregisterButton() {
      this.set('button', null);
    },
  }
});
