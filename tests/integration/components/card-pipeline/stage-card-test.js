import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('card-pipeline/stage-card', 'Integration | Component | card pipeline/stage card', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{card-pipeline/stage-card}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#card-pipeline/stage-card}}
      template block text
    {{/card-pipeline/stage-card}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
