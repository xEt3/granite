import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('modals/screening-responses', 'Integration | Component | modals/screening responses', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{modals/screening-responses}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#modals/screening-responses}}
      template block text
    {{/modals/screening-responses}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
