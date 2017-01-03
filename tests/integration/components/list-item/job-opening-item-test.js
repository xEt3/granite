import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('list-item/job-opening-item', 'Integration | Component | list item/job opening item', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{list-item/job-opening-item}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#list-item/job-opening-item}}
      template block text
    {{/list-item/job-opening-item}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
