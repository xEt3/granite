import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('form/integration-button', 'Integration | Component | form/integration button', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{form/integration-button}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#form/integration-button}}
      template block text
    {{/form/integration-button}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
