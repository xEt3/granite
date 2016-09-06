import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('stateful-intro-js', 'Integration | Component | stateful intro js', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{stateful-intro-js}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#stateful-intro-js}}
      template block text
    {{/stateful-intro-js}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
