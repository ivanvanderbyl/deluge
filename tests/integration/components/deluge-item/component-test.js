import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('deluge-item', 'Integration | Component | deluge item', {
  integration: true
});

test('rendering a single line item', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

  // Template block usage:" + EOL +
  this.render(hbs`
    {{deluge-item label="Test Item 1"}}
  `);

  assert.equal(this.$().text().trim(), 'Test Item 1');
});

test('rendering multiple lines', function(assert) {
  this.render(hbs`
    {{#deluge-item }}
      <div class="deluge-item-body layout vertical center-justified" two-line>
        <div>Primary Text for line 1</div>
        <div secondary>Secondary Text for line 2</div>
      </div>
    {{/deluge-item}}
  `);

  assert.equal(this.$('.deluge-item-body').length, 1, 'it renders block content once');
  assert.equal(this.$('div[secondary]').text().trim(), 'Secondary Text for line 2');
});

test('clicking item triggers action', function(assert) {
  assert.expect(2);
  this.on('primaryAction', function(item) {
    assert.ok('primaryAction was triggered');
    assert.equal(item.get('value'), 1);
  });

  this.render(hbs`{{deluge-item label="Test Item 1" value="1" action="primaryAction"}}`);

  this.$('deluge-item').click();
});

test('clicking disabled item does nothing', function(assert) {
  assert.expect(0);
  this.on('primaryAction', function(value) {
    assert.ok('primaryAction was triggered');
    assert.equal(value, 1);
  });

  this.render(hbs`{{deluge-item disabled=true label="Test Item 1" value="1" action="primaryAction"}}`);

  this.$('deluge-item').click();
});

test('disabled item has disabled attr', function(assert) {
  assert.expect(2);
  this.set('disabled', false);

  this.render(hbs`{{deluge-item disabled=disabled label="Test Item 1" value="1" action="primaryAction"}}`);

  assert.equal(this.$('deluge-item').attr('disabled'), undefined);

  this.set('disabled', true);
  assert.equal(this.$('deluge-item').attr('disabled'), 'disabled');
});
