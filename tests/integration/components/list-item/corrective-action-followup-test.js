import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('list-item/corrective-action-followup', 'Integration | Component | list item/corrective action followup', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{list-item/corrective-action-followup}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#list-item/corrective-action-followup}}
      template block text
    {{/list-item/corrective-action-followup}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
