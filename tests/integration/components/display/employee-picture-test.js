import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('display/employee-picture', 'Integration | Component | display/employee picture', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{display/employee-picture}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#display/employee-picture}}
      template block text
    {{/display/employee-picture}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
