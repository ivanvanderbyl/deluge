import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

const { run } = Ember;

moduleForComponent('deluge-menu-button', 'Integration | Component | deluge menu button', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`
    {{#deluge-menu-button}}
      <p>Dropdown Content</p>
    {{else}}
      Trigger
    {{/deluge-menu-button}}
  `);

  assert.equal(this.$('deluge-menu-button button').text().trim(), 'Trigger');

  this.$('deluge-menu-button button').click();

  run(this, function() {
    assert.equal(this.$('deluge-menu-button').hasClass('is-open'), true);
  });
});
