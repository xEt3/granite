import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import authenticate from 'granite/tests/helpers/auth';
import { visit, currentURL, click, find, settled } from '@ember/test-helpers';

module('Acceptance | action items', function (hooks) {
  setupApplicationTest(hooks);

  test('getting to the action items', async function (assert) {
    await authenticate.call(this, server);
    await visit('/account/action-items');
    assert.equal(currentURL(), '/account/action-items', 'on Action Items page');
  });

  test('action items elements show on page', async function (assert) {
    await authenticate.call(this, server);
    await server.create('action-items');
    await visit('/account/action-items');
    assert.equal(currentURL(), '/account/action-items', 'on Action Items page');
    assert.equal(find('.account__breadcrumb').textContent.trim().replace(/\s\s+|\n/g, ''), 'Account/Action Items');
    assert.dom('div.ui.cards > div > div').exists();
    assert.dom('i.large.filter.icon').exists();
    assert.dom('i.plus.icon').exists();
    assert.dom('i.sort.large.numeric.descending.icon').exists();
    await click('i.sort.large.numeric.descending.icon');
    assert.dom('i.sort.large.numeric.ascending.icon').exists();
    assert.dom('h6 > div').hasText('Owner: Ongoing since 10/14/17');
    assert.dom('div:nth-child(2) > span').hasText('Lowest (1)');
    assert.dom('a.right.floated > i').exists();
    await click('a.right.floated > i');
    await settled();
    assert.dom('i.unhide.fitted.icon').exists();
    assert.dom('div.extra.content > a.primary.button').hasText('View Item');
    assert.dom('div:nth-child(3) > h4 > span').hasText('No Participants');
  });

  test('filter by priority', async function (assert) {
    await authenticate.call(this, server);
    await server.createList('action-items', 5);
    await visit('/account/action-items');
    await click('i.large.filter.icon');
    assert.dom('.five.ui.buttons').isVisible();

    [ 'Lowest', 'Low', 'Medium', 'High', 'Highest' ].forEach((priority, i) => {
      assert.dom(`div.five.ui.buttons > button:nth-child(${i + 1})`).hasText(priority.toLowerCase());
      assert.dom(`div:nth-child(${i + 1}) > div > div:nth-child(2) > span`).hasText(`${priority} (${i + 1})`);
    });

    for (let i = 1; i <= 5; i++) {
      assert.dom(`button:nth-child(${i}) > i.square`).exists();
      await click(`div.five.ui.buttons > button:nth-child(${i})`);
      assert.dom(`button:nth-child(${i}) > i.checkmark`).exists();
    }

    await click('i.large.filter.icon');
    assert.dom('.five.ui.buttons').isNotVisible();
  });
});
