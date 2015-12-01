import Ember from 'ember';
import RegisterableMixin from 'deluge/mixins/registerable';
import { module, test } from 'qunit';

module('Unit | Mixin | registerable');

// Replace this with your real tests.
test('it works', function(assert) {
  let RegisterableObject = Ember.Object.extend(RegisterableMixin);
  let subject = RegisterableObject.create();
  assert.ok(subject);
});
