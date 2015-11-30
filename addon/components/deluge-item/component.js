import Ember from 'ember';
import layout from './template';
import Registerable from '../../mixins/registerable';
import KeyBindings from '../../mixins/key-bindings';
import ControlState from '../../mixins/control-state';

const { computed } = Ember;
const { oneWay } = computed;

export default Ember.Component.extend(ControlState, Registerable, KeyBindings, {
  layout: layout,

  tagName: 'deluge-item',

  classNames: ['deluge-item'],
  classNameBindings: ['isSelected'],

  attributeBindings: [
    // Applies ARIA Disabled
    'disabled:aria-disabled',
    // Applies disabled attribute to element or null.
    '_disabledAttrValue:disabled'
  ],

  ariaRole: 'option',

  registerableType: 'item',

  keyBindings: {
    enter: 'activateItem',
    space: 'activateItem',
  },

  isDisabled: true,

  /**
   * Selected items of parent component, usually a menu or a list.
   *
   * @type {Array}
   */
  selectedItems: oneWay('menu.selectedItems'),

  isSelected: computed('selectedItems.[]', 'menu', {
    get() {
      const selected = Ember.A(this.get('selectedItems'));
      return selected.contains(this);
    }
  }),

  focusIn(event) {
    if (this.get('disabled')) { return; }

    this.set('hasFocus', true);

    if (this.get('menu')) {
      event.stopPropagation();
    }

    let menu;
    if(menu = this.get('menu')) {
      menu.send('itemFocussed', this);
    }
  },

  focusOut() {
    this.set('hasFocus', false);
  },

  click() {
    this.send('activateItem');
  },

  activate() {
    if (this.get('disabled')) { return; }
    this.sendAction('action', this);
  },

  actions: {
    activateItem() {
      this.activate();
    }
  }

});
