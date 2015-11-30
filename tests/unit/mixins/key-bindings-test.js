import Ember from 'ember';
import KeyBindingsMixin from '../../../mixins/key-bindings';
import { module, test } from 'qunit';

module('Unit | Mixin | key bindings');

// Replace this with your real tests.
test('it works', function(assert) {
  let KeyBindingsObject = Ember.Object.extend(KeyBindingsMixin);
  let subject = KeyBindingsObject.create();
  assert.ok(subject);
});
