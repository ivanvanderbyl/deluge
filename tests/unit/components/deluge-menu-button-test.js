import { moduleForComponent, test } from 'ember-qunit';

import Ember from 'ember';

const { run } = Ember;

moduleForComponent('deluge-menu-button', 'Unit | Component | deluge menu button', {
  // Specify the other units that are required for this test
  // needs: ['helper:ember-tether'],
  unit: true
});

test('it updates state when open', function(assert) {
  assert.expect(2);

  let component = this.subject();

  assert.equal(component.get('isOpen'), false);

  run(this, function() {
    component.send('open');
    assert.equal(component.get('isOpen'), true);
  });
});

