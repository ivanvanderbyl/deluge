import Ember from 'ember';
import RegistryMixin from '../../../mixins/registry';
import { module, test } from 'qunit';

module('Unit | Mixin | registry');

// Replace this with your real tests.
test('it works', function(assert) {
  let RegistryObject = Ember.Object.extend(RegistryMixin);
  let subject = RegistryObject.create();
  assert.ok(subject);
});
