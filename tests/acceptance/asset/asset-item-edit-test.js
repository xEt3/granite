import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import authenticate from 'granite/tests/helpers/auth';
import { visit, currentURL, click, find, findAll, settled } from '@ember/test-helpers';

module('Acceptance | company assets', function (hooks) {
  setupApplicationTest(hooks);


  test('assets information', async function (assert) {
    let myAssetCategory = server.create('asset', {
      name:       'apple',
      attributes: [ 'blue' ]
    });

    await server.createList('asset-item', 7);
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


});
