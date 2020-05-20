import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | educate/sticky-cart', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    this.set('submit', () => {});

    await render(hbs`<Educate::StickyCart @onSubmit={{this.submit}} />`);
    assert.dom(this.element).includesText('Purchase');
  });
});
