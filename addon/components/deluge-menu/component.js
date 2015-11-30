import Ember from 'ember';
import layout from './template';
import Registerable from '../../mixins/registerable';
import Registry from '../../mixins/registry';
import MenuBehaviour from '../../mixins/menu-behaviour';
import ControlState from '../../mixins/control-state';
import KeyBindings from '../../mixins/key-bindings';

const { computed, run: { next } } = Ember;

export default Ember.Component.extend(KeyBindings, ControlState, MenuBehaviour, Registerable, Registry, {
  layout: layout,
  tagName: 'deluge-menu',

  /**
   * References all currently selected items. If multiple is false this will
   * always be 0 or 1 items.
   *
   * @type {Array}
   */
  selectedItems: Ember.A(),

  focussedItem: null,

  /**
   * Indicates whether to accept multiple selection of single selection of items.
   *
   * @type {Boolean}
   */
  multiple: false,

  init() {
    this._super(...arguments);
    this.set('selectedItems', Ember.A());
    this.set('menuItems', Ember.A());
    this.set('focussedItem', null);
    this.set('focusIndex', -1);
  },

  /**
   * Our name in reference to child and parent registry.
   *
   * Example:
   *   On the child we'll be registered as `menu`, whereas on the parent we'll
   *   call a registry action named `registerMenu` and `deregisterMenu`.
   *
   * @type {String}
   */
  registerableType: 'menu',

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
    down: 'selectNext',
    up: 'selectPrevious',
  },

  menuItems: Ember.A(),

  focusIn(event) {
    // console.log('menu focus in', this.get('menuItems.firstObject.elementId'));

    next(this, function() {
      let menuItems = this.get('menuItems');
      let focusIndex = this.get('focusIndex');
      if (!menuItems.objectAt(focusIndex)) {
        menuItems.get('firstObject').element.focus();
      }else{
        menuItems.objectAt(focusIndex).element.focus();
      }
    });
  },

  focusOut() {
    this.set('focusIndex', this.get('selectedIndex'));
  },

  selectedIndex: computed('selectedItems.[]', 'menuItems.[]', function() {
    return this.get('menuItems').indexOf(this.get('selectedItems.lastObject'));
  }),

  selectedItemValues: computed('selectedItems.[]', function() {
    return this.get('selectedItems').map((item) => item.get('value'));
  }),

  actions: {
    selectNext() {
      this.selectNext();
    },

    selectPrevious() {
      this.selectPrevious();
    },

    itemFocussed(item) {
      const nextIndex = this.get('menuItems').indexOf(item);
      if (this.get('focusIndex') !== nextIndex) {
        this.set('focusIndex', nextIndex);
      }
    },

    itemSelected(item) {
      const isMultiple = this.get('multiple');
      const selectedItems = this.get('selectedItems');

      if (isMultiple) {
        if (selectedItems.contains(item)) {
          selectedItems.removeObject(item);
        }else{
          selectedItems.addObject(item);
        }
      }else{
        if (selectedItems.contains(item)) {
          this.set('selectedItems', Ember.A([]));
        }else{
          this.set('selectedItems', Ember.A([item]));
        }
      }

      this.sendAction('action', this.get('selectedItemValues'));
    },

    registerItem(itemComponent) {
      this.get('menuItems').addObject(itemComponent);
    },

    deregisterItem(itemComponent) {
      this.get('menuItems').removeObject(itemComponent);
    },

    selectItemsByValue(newSelection) {
      let nextSelection = this.get('menuItems').filter((item) => {
        return newSelection.indexOf(item.get('value')) > -1;
      });

      this.set('selectedItems', nextSelection);
      console.log('set menu items by value', nextSelection.map((item) => item.get('value')));
    }
  }
});
