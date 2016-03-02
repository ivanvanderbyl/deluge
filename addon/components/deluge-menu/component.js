import Ember from 'ember';
import layout from './template';
import MenuBehaviour from '../../mixins/menu-behaviour';
import ControlState from '../../mixins/control-state';
import KeyBindings from '../../mixins/key-bindings';

const {
  computed,
  observer,
  isEmpty,
  run: { next },
} = Ember;

function afterRender() {
  Ember.run.schedule('afterRender', ...arguments);
}

export default Ember.Component.extend(KeyBindings, ControlState, MenuBehaviour, {
  layout: layout,
  tagName: 'deluge-menu',

  /**
   * References all currently selected items. If multiple is false this will
   * always be 0 or 1 items.
   *
   * @type {Array}
   */
  selectedItems: Ember.A(),

  /**
   * References the first selected Item. This is useful when not doing multiple
   * selects and you need the absolute item.
   *
   * @type {DelugeMenuItem}
   */
  selectedItem: computed.oneWay('selectedItems.firstObject'),

  /**
   * Indicates whether to accept multiple selection of single selection of items.
   *
   * @type {Boolean}
   */
  multiple: false,

  /**
   * Init: Reset values so they aren't shared across instances.
   */
  init() {
    this._super(...arguments);
    this.selectedItems = Ember.A();
    this.menuItems = Ember.A();
    this.focusIndex = -1;
  },

  keyBindings: {
    down: 'selectNext',
    up: 'selectPrevious',
  },

  disabledDidChange: observer('disabled', function() {
    const disabled = this.get('disabled');
    if (disabled) {
      this.set('selectedItems', Ember.A());
      this.sendDefaultAction();
    }
  }),

  /**
   * Menu items registered once we render
   *
   * @type {Array}
   */
  menuItems: Ember.A(),

  // menuItemsTotalWidth: computed('menuItems.[]', {
  //   get() {
  //     const menuItems = this.get('menuItems');

  //   }
  // }),

  focusIn() {
    afterRender(this, function() {
      let menuItems = this.get('menuItems');

      if (isEmpty(menuItems)) { return; }

      let focusIndex = this.get('selectedIndex');
      if (!menuItems.objectAt(focusIndex)) {
        this.selectNext();
      }else{
        menuItems.objectAt(focusIndex).element.focus();
      }
    });
  },

  focusOut() {
    this.set('focusIndex', this.get('selectedIndex'));
  },

  selectedIndex: computed('selectedItem', 'menuItems.[]', function() {
    return this.get('menuItems').indexOf(this.get('selectedItem'));
  }),

  selectedItemValues: computed('selectedItems.[]', {
    get() {
      return this.get('selectedItems').map((item) => item.get('value'));
    },

    // set(key, value) {
    //   const items = this.get('menuItems').filter((item) => {
    //     return value.indexOf(item.get('value')) > -1;
    //   });
    //   console.log(this.get('menuItems.length'));
    //   Ember.set(this, 'selectedItems', items);

    //   return value;
    // }
  }),

  // selection: Ember.computed.alias('selectedItemValues'),

  sendDefaultAction() {
    next(this, function() {
      this.sendAction('action', this.get('selectedItemValues'));
    });
  },

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

      this.sendDefaultAction();
    },

    addItem(itemComponent) {
      this.get('menuItems').addObject(itemComponent);
    },

    removeItem(itemComponent) {
      this.get('menuItems').removeObject(itemComponent);
    },

    selectItemsByValue(newSelection) {
      if (isEmpty(newSelection)) { return; }
      let nextSelection = this.get('menuItems').filter((item) => {
        return newSelection.indexOf(item.get('value')) > -1;
      });

      this.set('selectedItems', nextSelection);
    }
  }
});
