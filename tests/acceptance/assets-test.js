import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import authenticate from 'granite/tests/helpers/auth';
import { visit, currentURL, click, find, findAll, settled } from '@ember/test-helpers';

module('Acceptance | company assets', function (hooks) {
  setupApplicationTest(hooks);

  test('getting to the assets',async function (assert) {
    await authenticate.call(this, server);
    await visit('/account/assets');
    assert.equal(currentURL(), '/account/assets', 'on assets page');
  });

  test('no assets',async function (assert) {
    await authenticate.call(this, server);
    await visit('/account/assets');
    assert.equal(currentURL(), '/account/assets', 'on assets page');
    assert.ok(find('.ui.right.floated.pagination.menu'), 'pagination menu is on page');
    assert.ok(find('a[href="/account/assets/new"]'), 'plus icon is on page');
    let $header = find('.ui.center.aligned.header');
    assert.equal($header.textContent.trim().replace(/\s\s+|\n/g, ''), 'No assets available.', 'No assets were available');
  });

  test('list of assets',async function (assert) {
    await server.createList('asset-items', 7);
    await authenticate.call(this, server);
    await visit('/account/assets');
    assert.equal(currentURL(), '/account/assets', 'on assets page');
  });

  test('assets attributes',async function (assert) {
    await authenticate.call(this, server);
    let myAssetCategory = server.create('asset', { name: 'apple' });

    await server.createList('asset-items', 7);
    await visit('/account/assets');
    await settled();
    assert.equal(currentURL(),'/account/assets');
    assert.dom('div.content .header').hasText('apple');
    let item = `a[href="/account/asset/${myAssetCategory.id}/stock"]`;

    await click(item);
    await settled();

    assert.equal(currentURL(), `/account/asset/${myAssetCategory.id}/stock`);
    assert.equal(findAll('span.header.clearfix').length, 7, '7 items are on the page');
  });

  test('assets information',async function (assert) {
    let myAssetCategory = server.create('asset', {
      name:       'apple',
      attributes: [ 'blue' ]
    });

    await server.createList('asset-items', 7);
    await authenticate.call(this, server);
    await visit('/account/assets');
    await settled();
    await click('div.content .header');

    assert.dom('i.info.icon').exists();
    await click('i.info.icon');
    assert.equal(currentURL(), `/account/asset/${myAssetCategory.id}/information`, 'on assets information page');

    await settled();
    assert.dom('.content.clearfix span').hasText('blue');
  });

  test('assets documents',async function (assert) {
    let myAssetCategory = server.create('asset', {
      name:       'apple',
      attributes: [ 'blue' ]
    });

    await server.createList('asset-items', 7);
    await authenticate.call(this, server);
    await visit('/account/assets');
    await settled();
    await click('div.content .header');

    assert.dom('i.file.icon').exists();
    await click('.ui.pointing.menu a i.file.icon');
    assert.equal(currentURL(), `/account/asset/${myAssetCategory.id}/documents`, 'on assets information page');
  });
});
