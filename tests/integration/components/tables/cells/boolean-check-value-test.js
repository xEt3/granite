import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('tables/cells/boolean-check-value', 'Integration | Component | tables/cells/boolean check value', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{tables/cells/boolean-check-value}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#tables/cells/boolean-check-value}}
      template block text
    {{/tables/cells/boolean-check-value}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
