import Ember from 'ember';
import ControlStateMixin from 'deluge/mixins/control-state';
import { module, test } from 'qunit';

module('Unit | Mixin | control state');

// Replace this with your real tests.
test('it works', function(assert) {
  let ControlStateObject = Ember.Object.extend(ControlStateMixin);
  let subject = ControlStateObject.create();
  assert.ok(subject);
});
