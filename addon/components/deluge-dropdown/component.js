import Ember from 'ember';
import layout from './template';
import KeyBindings from '../../mixins/key-bindings';

const { computed, run: { next } } = Ember;

export default Ember.Component.extend(KeyBindings, {
  layout: layout,

  classNames: ['deluge-dropdown'],

  attributeBindings: ['tabIndex:tabindex'],

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
      let menu;
      if (menu = this.get('menu')) {
        menu.send('selectNext');
      }
    },

    selectPrevious() {
      let menu;
      if (menu = this.get('menu')) {
        menu.send('selectPrevious');
      }
    },

    // registerMenu(menuComponent) {
    //   this.set('menu', menuComponent);
    //   this.focusMenu();
    // },

    // deregisterMenu() {
    //   this.set('menu', null);
    // }
  },

  focusMenu() {
    next(this, function(){
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
