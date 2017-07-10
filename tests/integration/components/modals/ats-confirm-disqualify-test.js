import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('modals/ats-confirm-disqualify', 'Integration | Component | modals/ats confirm disqualify', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{modals/ats-confirm-disqualify}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#modals/ats-confirm-disqualify}}
      template block text
    {{/modals/ats-confirm-disqualify}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
