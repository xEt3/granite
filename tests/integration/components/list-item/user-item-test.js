import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('list-item/user-item', 'Integration | Component | list item/user item', {
  integration: true
});

test('it renders', function(assert) {
  this.set('user', {
    fullName: 'Bob Ross'
  });

  // Template block usage:
  this.render(hbs`
    {{list-item/user-item}}
  `);

  assert.equal(this.$().text().trim().indexOf('bob') > -1, '');
});
