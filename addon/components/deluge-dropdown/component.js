import Ember from 'ember';
import layout from './template';
import Registerable from '../../mixins/registerable';
import KeyBindings from '../../mixins/key-bindings';
import Registry from '../../mixins/registry';

const { computed } = Ember;

export default Ember.Component.extend(Registry, Registerable, KeyBindings, {
  layout: layout,

  classNames: ['deluge-dropdown'],

  attributeBindings: ['tabIndex:tabindex'],

  registerableType: 'dropdown',

  button: null,

  disabled: false,

  tabIndex: computed('disabled', function() {
    return !this.get('disabled') ? (this.get('tabindex') || '0') : "-1";
  }),

  keyBindings: {
    esc: 'close',
  },

  actions: {
    close() {
      const button = this.get('parentComponent');
      if (!button) { return; }
      button.send('close');
    },

    selectNext() {
      console.log('down');
      let menu;
      if (menu = this.get('menu')) {
        menu.send('selectNext');
      }
    },

    selectPrevious() {
      console.log('up');
      let menu;
      if (menu = this.get('menu')) {
        menu.send('selectPrevious');
      }
    },

    registerMenu(menuComponent) {
      this.set('menu', menuComponent);
      this.focusMenu();
    },

    deregisterMenu() {
      this.set('menu', null);
    }
  },

  focusMenu() {
    Ember.run.next(this, function(){
      let menu;
      if (menu = this.get('menu')) {
        menu.element.focus();
      }
    });
  },

  focusIn() {
    this.focusMenu();
  },

  focusOut() {
    const button = this.get('parentComponent');
    if (!button) { return; }
    Ember.run.next(this, function(){
      if (button.$().has(document.activeElement).length === 0) {
        button.send("close");
      }
    });
  },
});
