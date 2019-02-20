import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, fillIn, settled, focus, blur } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | search/suggestion-input', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders with expected elements', async function (assert) {
    await render(hbs`{{search/suggestion-input}}`);
    assert.dom('.ui.search .input > input').exists();

    // placeholder usage
    await render(hbs`{{search/suggestion-input placeholder="a test"}}`);
    assert.dom('.ui.search .input > input').hasAttribute('placeholder', 'a test');
  });

  test('it calls search when inputing', async function (assert) {
    let callCount = 0,
        query;

    await render(hbs`{{search/suggestion-input}}`);

    let search = await this.owner.lookup('service:search');
    search.set('performSearch', (q) => {
      return new Promise(resolve => {
        callCount++;
        query = q;
        resolve([{ title: 'A test' }]);
      });
    });

    assert.dom('.ui.search').exists();

    await fillIn('.ui.search input', 'richard');
    await focus('.ui.search input');
    await new Promise(done => setTimeout(done, 1000));
    await settled();
    await blur('.ui.search input');
    await new Promise(done => setTimeout(done, 2000));

    assert.equal(callCount, 1, 'Call count for "performSearch" is 1 (debounced)');
    assert.equal(query, 'richard', 'Query was passed to "performSearch"');
  });
});
