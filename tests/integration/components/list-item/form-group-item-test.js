import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | list-item/form-group-item', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    this.set('model', {
      name:  'test',
      count: 1
    });
    await render(hbs`{{list-item/form-group-item model}}`);

    assert.dom(this.element).includesText('test');
    assert.dom(this.element).includesText('1 response');
  });
});
