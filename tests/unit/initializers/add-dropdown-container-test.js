import Ember from 'ember';
import AddDropdownContainerInitializer from '../../../initializers/add-dropdown-container';
import { module, test } from 'qunit';

let application;

module('Unit | Initializer | add dropdown container', {
  beforeEach() {
    Ember.run(function() {
      application = Ember.Application.create();
      application.deferReadiness();
    });
  }
});

// Replace this with your real tests.
test('it works', function(assert) {
  AddDropdownContainerInitializer.initialize(application);

  // you would normally confirm the results of the initializer here
  assert.ok(true);
});
