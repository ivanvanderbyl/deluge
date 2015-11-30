import Ember from 'ember';

const { on, computed } = Ember;

export default Ember.Mixin.create({

  classNameBindings: ['disabled'],

  attributeBindings: ['tabIndex'],


  /**
   * Indicates that the component is disabled. This property is applied to all
   * behaviours and the trigger button.
   *
   * @type {Boolean}
   */
  disabled: false,

  tabIndex: 0,

  didReceiveAttrs() {
    this.set('tabIndex', this.getAttr('disabled') ? '-1' : '0');
  },

  /**
   * Computes disabled attr value separate to disabled property because ember
   * applies literal value of true false, but null removes attr.
   */
  _disabledAttrValue: computed('disabled', function() {
    return this.get('disabled') ? 'disabled' : null;
  }),

  acceptFocus: on('focusIn', function(event) {
    if (this.get('disabled')) {
      event.preventDefault();
      event.target.blur();
    }
  }),
});
