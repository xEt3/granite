import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('list-item/unapplied-change', 'Integration | Component | list item/unapplied change', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{list-item/unapplied-change}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#list-item/unapplied-change}}
      template block text
    {{/list-item/unapplied-change}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
