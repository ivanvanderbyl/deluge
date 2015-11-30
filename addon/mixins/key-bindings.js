import Ember from 'ember';

const KEY_CODE = {
  9: 'tab',
  13: 'enter',
  27: 'esc',
  33: 'pageup',
  34: 'pagedown',
  35: 'end',
  36: 'home',
  32: 'space',
  37: 'left',
  38: 'up',
  39: 'right',
  40: 'down',
  46: 'del',
  106: '*'
};

export default Ember.Mixin.create({
  attributeBindings: [
    'tabIndex:tabindex',
  ],

  tabIndex: 0,

  keyDown(event) {
    let handler = this.keyBindings[KEY_CODE[event.keyCode]];
    if (this.actions[handler]) {
      event.preventDefault();
      this.send(handler);
    }else{
      this._super(event);
    }
  },

  keyBindings: {}
});
