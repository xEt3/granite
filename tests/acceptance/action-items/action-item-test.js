import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import authenticate from 'granite/tests/helpers/auth';
import moment from 'moment';
import { visit, currentURL, click, find, settled, fillIn } from '@ember/test-helpers';

module('Acceptance | action item', function (hooks) {
  setupApplicationTest(hooks);

  test('opening an action item', async function (assert) {
    await authenticate.call(this, server);
    let action = await server.create('action-item', { title: 'apples' });

    await visit('/account/action-items');
    await click('div.extra.content > a.primary.button');
    await settled();
    assert.equal(currentURL(), `/account/action-item/${action.title}`);
    assert.dom('.ui.point.menu > .right.menu').doesNotExist();
  });

  test('action item elements show on page', async function (assert) {
    let { employee } = await authenticate.call(this, server);
    let action = await server.create('action-item', {
      title:         'apples',
      prerequisites: [],
      owner:         employee
    });

    await visit(`/account/action-item/${action.title}`);
    assert.equal(find('.account__breadcrumb').textContent.trim().replace(/\s\s+|\n/g, ''), 'Account/Action Items/Action Item');
    assert.dom('.ui.pointing.menu > a').exists({ count: 3 });
    assert.dom('div.item.icon > div').hasClass('menu');
    assert.dom('div.item.icon > div.menu.transition.visible').isNotVisible();
    await click('div.item.icon');

    await new Promise(resolve => setTimeout(resolve, 500));
    assert.dom('div.item.icon > div.menu.transition.visible').isVisible();
    assert.dom('div.item.icon > div.menu.transition.visible > a').exists({ count: 3 });
    assert.dom('div.item.icon > div.menu.transition.visible > div').exists({ count: 4 });
    assert.dom('div.item.icon > div.menu.transition.visible > div > a').exists({ count: 2 });
    assert.dom('div.ui.very.padded.raised.segment').isVisible();
    assert.dom('div.ui.green.label').hasText(`Started on ${moment(action.created).format('M/D/YY')}`);
    assert.dom('h2.clearfix.header').hasText(`${action.title} No due date`);
    assert.dom(`h2 > a[href="/account/action-item/${action.title}/edit"]`).exists();
    assert.dom('h2.clearfix.header > span').hasText('No due date');
    assert.dom('div.ui.very.padded.raised.segment > p').hasText(action.description);
    assert.dom('div.divider.ui').isVisible();
    assert.dom('div.ui.very.padded.raised.segment > h3.header').hasText('1 Project Waiting');
    assert.dom('div#ember-testing a > div').hasText(action.title);
  });

  test('todo action item elements', async function (assert) {
    await authenticate.call(this, server);
    let action = await server.create('action-item', { title: 'apples' });

    await visit('/account/action-items');
    await click('div.extra.content > a.primary.button');
    await settled();
    await click('div.menu__container-responsive > div > a:nth-child(2)');
    assert.equal(currentURL(), `/account/action-item/${action.title}/todo`);
    assert.dom('div.ui.padded.green.segment > h2.header').hasText('Your Todo Items');
    assert.dom('h2 > div.content').hasText('All up to date!');
    assert.dom('h2 > span.emoji').hasClass('emoji-tada');
  });

  test('discussion action item elements', async function (assert) {
    await authenticate.call(this, server);
    let action = await server.create('action-item', { title: 'apples' });

    await visit('/account/action-items');
    await click('div.extra.content > a.primary.button');
    await settled();
    await click('div.menu__container-responsive > div > a:nth-child(3)');
    assert.equal(currentURL(), `/account/action-item/${action.title}/discussion`);
    assert.equal(find('.account__breadcrumb').textContent.trim().replace(/\s\s+|\n/g, ''), 'Account/Action Items/Action Item/Discussion');
    assert.dom('div > a.item.active').hasText('Discussion');
    assert.dom('div > textarea').doesNotIncludeText();
    assert.dom('div.field.text > button[type="submit"]').isVisible();
    assert.dom('div > h3.dividing.header').hasText('Comments');
    assert.dom('div > h3.center.text.header').hasText('No comments available.');
    await fillIn('div > textarea', 'this is a test comments');
    await click('div.field.text > button[type="submit"]');
    await settled();
    assert.dom('div.content > div.text').hasText('this is a test comments');
    assert.dom('span.date > span').includesText('just now');
    assert.dom('div.actions > a').isVisible();
    await click('div.actions > a');
    await settled();
    assert.dom('div.actions > a').isNotVisible();
    assert.dom('span.date > span').isNotVisible();
  });
});
