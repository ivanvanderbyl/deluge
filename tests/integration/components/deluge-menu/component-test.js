import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('deluge-menu', 'Integration | Component | deluge menu', {
  integration: true
});

const menuTemplate = hbs`
  {{#deluge-menu action="itemSelected" as |menu|}}
    {{deluge-item label="Item 1" value="1"}}
    {{deluge-item label="Item 2" value="2"}}
    {{deluge-item label="Item 3" value="3" disabled=true}}
    {{deluge-item label="Item 4" value="4"}}
  {{/deluge-menu}}
`;

test('clicking an item triggers the menu default action', function(assert) {
  assert.expect(1);

  this.on('itemSelected', function(value) {
    assert.equal(value, 2);
  });

  this.render(menuTemplate);
  this.$('deluge-menu deluge-item:nth-of-type(2)').click();
});
