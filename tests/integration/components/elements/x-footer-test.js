import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('elements/x-footer', 'Integration | Component | elements/x footer', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{elements/x-footer}}`);

  assert.ok(this.$().text().trim().toLowerCase().indexOf('granite') > -1, 'Contains company name');
});
