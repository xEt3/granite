import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('diff-value-translator', 'Integration | Component | diff value translator', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{diff-value-translator}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#diff-value-translator}}
      template block text
    {{/diff-value-translator}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
