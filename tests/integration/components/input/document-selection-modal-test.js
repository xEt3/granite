import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('input/document-selection-modal', 'Integration | Component | input/document selection modal', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{input/document-selection-modal}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#input/document-selection-modal}}
      template block text
    {{/input/document-selection-modal}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
