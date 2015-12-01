import Ember from 'ember';
import MenuBehaviourMixin from 'deluge/mixins/menu-behaviour';
import { module, test } from 'qunit';

module('Unit | Mixin | menu behaviour');

// Replace this with your real tests.
test('it works', function(assert) {
  let MenuBehaviourObject = Ember.Object.extend(MenuBehaviourMixin);
  let subject = MenuBehaviourObject.create();
  assert.ok(subject);
});
