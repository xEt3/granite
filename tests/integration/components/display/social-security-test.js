import { moduleForComponent, test } from 'ember-qunit';
import wait from 'ember-test-helpers/wait';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('display/social-security', 'Integration | Component | display/social security', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(4);

  this.render(hbs`{{display/social-security}}`);

  assert.ok(this.$('input')[0], 'should contain input');
  assert.equal(this.$('input').attr('type'), 'password', 'should default to password');
  this.$('a').click();
  return wait()
  .then(() => {
    assert.equal(this.$('input').attr('type'), 'text', 'should change to text after clicking once');
    this.$('a').click();
    return wait();
  })
  .then(() => {
    assert.equal(this.$('input').attr('type'), 'password', 'should change to password after clicking again');
  });
});
