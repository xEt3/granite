import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import authenticate from 'granite/tests/helpers/auth';
import { visit, currentURL, click, find, pauseTest, settled} from '@ember/test-helpers';

module('Acceptance | action item', function(hooks) {
  setupApplicationTest(hooks);

  test('opening an action item',async function(assert){
    await authenticate.call(this, server );
    let action = await server.create('action-items', {
      title: 'apples'
    });

    await visit('/account/action-items');
    await click('div.extra.content > a.primary.button');
    await settled();
    assert.equal(currentURL(), `/account/action-item/${action.title}`);
  });

  test('action item elements show on page',async function(assert){
    await authenticate.call(this, server);
    let action = await server.create('action-items', {
      title: 'apples',
      prerequisites: []
    });

    await visit(`/account/action-item/${action.title}`);
    assert.equal(find('.account__breadcrumb').textContent.trim().replace(/\s\s+|\n/g, ''), 'Account/Action Items/Action Item');
    assert.dom('.ui.pointing.menu > a' ).exists({ count:3 });
    assert.dom('div.item.icon > div').hasClass('menu');
    assert.dom('div.item.icon > div.menu.transition.visible').isNotVisible();
    await click('div.item.icon');
    await new Promise(resolve => setTimeout(resolve, 500));
    assert.dom('div.item.icon > div.menu.transition.visible').isVisible();
    assert.dom('div.item.icon > div.menu.transition.visible > a').exists({ count:3 });
    assert.dom('div.item.icon > div.menu.transition.visible > div').exists({ count:4 });
    assert.dom('div.item.icon > div.menu.transition.visible > div > a').exists({ count:2 });
    assert.dom('div.ui.very.padded.raised.segment').isVisible();
    assert.dom('div.ui.green.label').hasText('Started on 10/14/17');
    assert.dom('h2.clearfix.header').hasText(`${action.title} No due date`);
    assert.dom(`h2 > a[href="/account/action-item/${action.title}/edit"]`).exists();
    assert.dom('h2.clearfix.header > span').hasText('No due date');
    assert.dom('div.ui.very.padded.raised.segment > p').hasText(action.description);
    assert.dom('div.divider.ui').isVisible();
    assert.dom('div.ui.very.padded.raised.segment > h3.header').hasText('1 Project Waiting');
    assert.dom('div#ember-testing a > div').hasText(action.title);
  });

  test('todo action item elements', async function (assert){
    await authenticate.call(this, server );
    let action = await server.create('action-items', {
      title: 'apples'
    });

    await visit('/account/action-items');
    await click('div.extra.content > a.primary.button');
    await settled();
    await click('div.menu__container-responsive > div > a:nth-child(2)');
    assert.equal(currentURL(), `/account/action-item/${action.title}/todo`);
    await pauseTest();
    assert.dom('div.ui.padded.green.segment > h2.header').hasText('Your Todo Items');
    assert.dom('h2 > div.content').hasText('All up to date!');
    assert.dom('h2 > span').hasClass('emoji emoji-tada');



  });

  test('discussion action item elements', async function (assert){
    await authenticate.call(this, server );
    let action = await server.create('action-items', {
      title: 'apples'
    });

    await visit('/account/action-items');
    await click('div.extra.content > a.primary.button');
    await settled();
    await click('div.menu__container-responsive > div > a:nth-child(3)');
    assert.equal(currentURL(), `/account/action-item/${action.title}/discussion`);


  });


});
