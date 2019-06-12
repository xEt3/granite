import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import authenticate from 'granite/tests/helpers/auth';
import { visit, currentURL, click, settled, fillIn } from '@ember/test-helpers';

module('Acceptance | edit company asset-items', function (hooks) {
  setupApplicationTest(hooks);

  test('editing an asset-item', async function (assert) {
    let myAssetCategory = server.create('asset');
    await authenticate.call(this, server);
    await visit('/account/assets');
    await settled();
    await click('div.content .header');

    assert.equal(currentURL(), `/account/asset/${myAssetCategory.id}/stock`, 'on assets stock page');

    await click('.plus.icon');
    await fillIn('#asset-identifier', 'text');
    await fillIn(`input[placeholder="${myAssetCategory.attributes} value"]`, 'header');
    await click('.ui.huge.green.button');
    await click('span > .edit.icon');
    await fillIn(`input[placeholder="${myAssetCategory.attributes} value"]`, 'updated attribute');
    await click('.ui.huge.green.button');
    await click('.down.angle.icon');

    assert.dom('.line-item-value > u').hasText('updated attribute');
  });
});
