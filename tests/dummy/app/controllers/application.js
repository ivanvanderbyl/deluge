import Ember from 'ember';

export default Ember.Controller.extend({
  mainMenuDisabled: false,

  allowMultiple: false,

  primarySelectedItem: ['new'],

  primarySelectedItemDidChange: Ember.observer('primarySelectedItem.[]', function() {
    console.log(`Selection=[${this.get('primarySelectedItem').join(', ')}]`);
  }),

  actions: {
    toggleDisabled() {
      this.toggleProperty('mainMenuDisabled');
    },

    primaryAction(value) {
      this.set('primarySelectedItem', Ember.A(value));
    }
  }
});
