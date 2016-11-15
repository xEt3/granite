import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('visualizations/reorganization-tree', 'Integration | Component | visualizations/reorganization tree', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{visualizations/reorganization-tree}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#visualizations/reorganization-tree}}
      template block text
    {{/visualizations/reorganization-tree}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
