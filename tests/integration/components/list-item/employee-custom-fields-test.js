import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('list-item/employee-custom-fields', 'Integration | Component | list item/employee custom fields', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{list-item/employee-custom-fields}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#list-item/employee-custom-fields}}
      template block text
    {{/list-item/employee-custom-fields}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
