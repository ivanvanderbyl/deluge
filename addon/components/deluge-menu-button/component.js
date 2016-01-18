/* global Tether */

import Ember from 'ember';
import layout from './template';
import Registry from '../../mixins/registry';
import Registerable from '../../mixins/registerable';
import KeyBindings from '../../mixins/key-bindings';
import ControlState from '../../mixins/control-state';
import computedStyle from 'ember-computed-style';

const {
  inject,
  computed,
  run,
  isPresent,
} = Ember;

export default Ember.Component.extend(ControlState, Registerable, Registry, KeyBindings, {
  layout: layout,
  tagName: 'deluge-menu-button',
  classNames: ['deluge-menu-button'],

  classNameBindings: ['isOpen'],

  delugeDropdownService: inject.service('deluge-dropdown'),
  destinationElementId: computed.oneWay('delugeDropdownService.destinationElementId'),

  renderInPlace: false,

  registerableType: 'button',

  /**
   * Dropdown attachment basis.
   *
   * @type {String}
   */
  triggerAttachment: 'top left',

  /**
   * Attachement for the dropdown relative to triggerAttachment
   *
   * @type {String}
   */
  dropdownAttachment: 'top left',

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
   * The orientation against which to align the menu dropdown
   * vertically relative to the dropdown trigger.
   *
   * @type {String}
   */
  verticalAlign: 'top',

  /**
   * The orientation against which to align the menu dropdown
   * horizontally relative to the dropdown trigger.
   *
   * @type {String}
   */
  horizontalAlign: 'left',

  /**
   * A pixel value that will be added to the position calculated for the
   * given `horizontalAlign`. Use a negative value to offset to the
   * left, or a positive value to offset to the right.
   *
   * @type {Number}
   */
  horizontalOffset: 0,

  /**
   * A pixel value that will be added to the position calculated for the
   * given `verticalAlign`. Use a negative value to offset towards the
   * top, or a positive value to offset towards the bottom.
   *
   * @type {Number}
   */
  verticalOffset: computed('_positionRect', {
    get() {
      const { height } = this.get('_positionRect');
      return height;
    }
  }),

  /**
   * Set to true to disable automatically closing the dropdown after
   * a selection has been made.
   */
  ignoreSelect: false,

  positionTarget: "button.trigger",

  dropdownTarget: computed('elementId', function() {
    return `#${this.get('elementId')} button.trigger`;
  }),

  attributeBindings: [
    // Applies ARIA-HasPopup
    'hasPopUp:aria-haspopup',

    // Applies ARIA Disabled
    'disabled:aria-disabled',

    // Applies disabled attribute to element or null.
    '_disabledAttrValue:disabled'
  ],

  ariaRole: 'group',
  hasPopUp: true,

  keyBindings: {
    esc: 'close',
    down: 'open',
    up: 'open',
  },

  didInsertElement() {
    this.addGlobalEventHandlers();
  },

  willDestroyElement() {
    this.removeGlobalEventHandlers();
  },

  addGlobalEventHandlers() {
    window.addEventListener('scroll', this.handleRepositioningEvent.bind(this));
    window.addEventListener('resize', this.handleRepositioningEvent.bind(this));

    // document.addEventListener('click', (event) => {
    //   console.log(event.path.indexOf(this.element));
    // });
  },

  removeGlobalEventHandlers() {
    window.removeEventListener('scroll', this.handleRepositioningEvent);
    window.removeEventListener('resize', this.handleRepositioningEvent);
    // document.removeEventListener('click', this.handleRootClick.bind(this));
  },

  handleRepositioningEvent() {
    if (this.get('isOpen')) {
      run.next(this, function() {

      });
    }

    // run.throttle(this, 'repositionDropdownContent', 60, true);
  },

  /**
   * The bounding rect of the position target.
   *
   * @return {PositionRect}
   */
  _positionRect: computed('positionTarget', function() {
    const positionTarget = this.get('positionTarget');
    if (isPresent(positionTarget)) {
      return this.element.querySelector(positionTarget).getBoundingClientRect();
    }else{
      return this.element.getBoundingClientRect();
    }
  }).volatile(),

  /**
   * The horizontal offset value used to position the dropdown.
   */
  _horizontalAlignTargetValue: computed(function() {
    const { right, left } = this.get('_positionRect');
    let target;

    if (this.get('horizontalAlign') === 'right') {
      target = document.documentElement.clientWidth - right;
    } else {
      target = left;
    }
    target += this.get('horizontalOffset');
    return Math.max(target, 0);
  }),

  /**
   * The vertical offset value used to position the dropdown.
   */
  _verticalAlignTargetValue: computed(function() {
    const { bottom, top } = this.get('_positionRect');
    let target;

    if (this.get('verticalAlign') === 'bottom') {
      target = document.documentElement.clientHeight - bottom;
    } else {
      target = top;
    }
    target += this.get('verticalOffset');
    return Math.max(target, 0);
  }),

  computedPositionStyle: computedStyle('positionStyles'),

  positionStyles: Ember.computed(function() {
    const { horizontalAlign, verticalAlign } = this.getProperties('horizontalAlign', 'verticalAlign');
    const { _horizontalAlignTargetValue: horizontal, _verticalAlignTargetValue: vertical } = this.getProperties('_horizontalAlignTargetValue', '_verticalAlignTargetValue');

    let styleObject = {
      position: 'absolute',
      width: Math.ceil(this.get('_positionRect').width),
    };

    styleObject[horizontalAlign] = horizontal;
    styleObject[verticalAlign] = vertical;

    return styleObject;
  }),

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

  // dropdownAttachment: computed('verticalAlign', 'horizontalAlign', {
  //   get() {
  //     let verticalAlign = this.get('verticalAlign');
  //     let horizontalAlign = this.get('horizontalAlign');
  //     if (verticalAlign === 'top') {
  //       return `bottom ${horizontalAlign}`;
  //     }else{
  //       return `top ${horizontalAlign}`;
  //     }
  //   }
  // }),

  touchEnd() {
    this.open();
  },

  toggle() {
    if (this.get('disabled')) { return; }
    this.toggleProperty('isOpen');
    this.handleRepositioningEvent();
  },

  open() {
    if (this.get('disabled')) { return; }
    this.set('isOpen', true);
    this.handleRepositioningEvent();
    this.element.offsetWidth = this.element.offsetWidth;
  },

  close() {
    this.set('isOpen', false);
  },

  focusIn(event) {
    if (event.target === this.element) {
      this.focusTrigger();
    }
  },

  triggerElement: computed('element', function() {
    return this.element.querySelector('.trigger');
  }),

  focusTrigger() {
    const trigger = this.get('triggerElement');
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

  repositionDropdownContent() {
    const trigger = this.get('triggerElement');
    let { left, top: topWithoutScroll, width, height } = trigger.getBoundingClientRect();

    // console.log(left, topWithoutScroll, width, height);
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
