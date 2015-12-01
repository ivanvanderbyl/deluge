import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

moduleForComponent('deluge-dropdown-menu', 'Integration | Component | deluge dropdown menu', {
  integration: true
});

test('it renders and toggles open and closed state', function(assert) {
  this.render(hbs`
    {{#deluge-dropdown-menu
    label="Select Item..." as |dropdown selection|}}
      {{#deluge-menu selection=selection as |menu selectedItem|}}
        {{deluge-item label="Item 1" value="item-1"}}
        {{deluge-item label="Item 2" value="item-2"}}
      {{/deluge-menu}}
    {{/deluge-dropdown-menu}}
  `);

  assert.equal(this.$('deluge-dropdown-menu').length, 1);
  assert.equal(this.$('button').text().trim(), "Select Item...");

  this.$('deluge-menu-button button').click();

  Ember.run(function() {
    assert.equal(this.$('deluge-item').length, 2, 'menu is open and showing 2 items');
    assert.equal(this.$('deluge-item:first-of-type').text().trim(), "Item 1");
  });
});
