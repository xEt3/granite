import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('display/icon-for-file', 'Integration | Component | display/icon for file', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{display/icon-for-file}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#display/icon-for-file}}
      template block text
    {{/display/icon-for-file}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
