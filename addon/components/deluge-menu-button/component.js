import Ember from 'ember';
import layout from './template';
import Registry from '../../mixins/registry';
import Registerable from '../../mixins/registerable';
import KeyBindings from '../../mixins/key-bindings';
import ControlState from '../../mixins/control-state';

const { computed, run } = Ember;

export default Ember.Component.extend(ControlState, Registerable, Registry, KeyBindings, {
  layout: layout,
  tagName: 'deluge-menu-button',
  classNames: ['deluge-menu-button'],

  classNameBindings: ['isOpen'],

  /**
   * Indicated that the component is in the open state. This property is applied
   * to all sub-components.
   *
   * @type {Boolean}
   */
  isOpen: false,

  /**
   * Reference to child dropdown component.
   *
   * @type {DelugeMenuComponent}
   */
  menu: null,

  /**
   * Indicates that we have a proper dropdown.
   *
   * @type {Boolean}
   */
  hasDropdown: computed.notEmpty('menu'),

  /**
   * Alignment for top position.
   *
   * @type {String}
   */
  verticalAlign: 'top',

  /**
   * Alignment for left position.
   *
   * @type {String}
   */
  horizontalAlign: 'left',

  registerableType: 'button',

  attributeBindings: [
    // Applies ARIA-HasPopup
    'hasPopUp:aria-haspopup',

    // Applies ARIA Disabled
    'disabled:aria-disabled',

    // Applies disabled attribute to element or null.
    '_disabledAttrValue:disabled'
  ],

  ariaRole: 'group',
  hasPopUp: computed.oneWay('hasDropdown'),

  /**
   * Set to true to disable automatically closing the dropdown after
   * a selection has been made.
   */
  ignoreSelect: false,

  keyBindings: {
    esc: 'close',
    down: 'open',
    up: 'open',
  },

  /**
   * The public API we expose to sub components as the first block param.
   *
   * @type {Object}
   */
  publicAPI: {},

  dropdownTarget: computed('elementId', function() {
    return `#${this.get('elementId')} button.trigger`;
  }),

  didInitAttrs() {
    this.set('publicAPI', {
      isOpen: false,
      actions: {
        open: this.open.bind(this),
        close: this.close.bind(this),
        toggle: this.toggle.bind(this),
      }
    });
  },

  dropdownAlignment: computed('verticalAlign', {
    get() {
      let verticalAlign = this.get('verticalAlign');
      let horizontalAlign = this.get('horizontalAlign');
      if (verticalAlign === 'top') {
        return `top ${horizontalAlign}`;
      }else{
        return `bottom ${horizontalAlign}`;
      }
    }
  }),

  dropdownAttachment: computed('verticalAlign', 'horizontalAlign', {
    get() {
      let verticalAlign = this.get('verticalAlign');
      let horizontalAlign = this.get('horizontalAlign');
      if (verticalAlign === 'top') {
        return `bottom ${horizontalAlign}`;
      }else{
        return `top ${horizontalAlign}`;
      }
    }
  }),

  touchEnd() {
    this.open();
  },

  toggle() {
    if (this.get('disabled')) { return; }
    this.toggleProperty('isOpen');
  },

  open() {
    if (this.get('disabled')) { return; }
    this.set('isOpen', true);
  },

  close() {
    this.set('isOpen', false);
  },

  focusIn(event) {
    if (event.target === this.element) {
      this.focusTrigger();
    }
  },

  focusTrigger() {
    const trigger = this.element.querySelector('.trigger');
    if (trigger.tabIndex > -1) {
      trigger.focus();
    }
  },

  focusDropdown() {
    run.schedule('afterRender', this, function() {
      if (!this.get('dropdown')) { return; }
      this.get('dropdown').element.focus();
    });
  },

  didSelect() {
    if (!this.get('ignoreSelect')) {
      this.close();
    }
  },

  actions: {
    // Registers a sub-component dropdown with us. This indicates that it is actually
    // in the DOM and we can give it focus.
    registerDropdown(dropdownComponent) {
      this.set('dropdown', dropdownComponent);
      this.focusDropdown();
    },

    registerMenu(menuComponent) {
      this.set('menu', menuComponent);

      menuComponent.send('selectItemsByValue', this.get('selection'));

      run.schedule('afterRender', this, function() {
        menuComponent.element.focus();
      });
    },

    deregisterMenu() {
      this.set('menu', null);
    },

    /**
     * Deregister dropdown component. This indicates it will be removed from the
     * DOM next.
     */
    deregisterDropdown() {
      this.set('dropdown', null);
    },

    /**
     * Propagates selection from dropdown menu.
     */
    selectionChanged(newSelection) {
      this.set('selection', newSelection);
    },

    /**
     * Action handler for a menu item being selected. This triggers the behaviours
     * necessary for responding to an item selection, like closing the menu and
     * sending the necessary actions to the parent template.
     */
    itemSelected(item) {
      console.log('[button] selected item', item);
      this.didSelect(item);
    },

    toggle() {
      this.toggle();
    },

    open() {
      this.open();
    },

    close() {
      this.close();
    },
  },
});
