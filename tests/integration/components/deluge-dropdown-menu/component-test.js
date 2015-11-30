import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('deluge-dropdown-menu', 'Integration | Component | deluge dropdown menu', {
  integration: true
});

test('it renders', function(assert) {
  
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

  this.render(hbs`{{deluge-dropdown-menu}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:" + EOL +
  this.render(hbs`
    {{#deluge-dropdown-menu}}
      template block text
    {{/deluge-dropdown-menu}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
