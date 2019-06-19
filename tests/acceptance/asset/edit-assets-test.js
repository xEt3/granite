import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import authenticate from 'granite/tests/helpers/auth';
import { visit, currentURL, fillIn, click } from '@ember/test-helpers';

module('Acceptance | company asset-category functionality', function (hooks) {
  setupApplicationTest(hooks);

  test('Add asset category', async function (assert) {
    await authenticate.call(this, server);
    await visit('account/assets');
    assert.equal(currentURL(), 'account/assets', 'on assets page');

    await click('h3 > a.right.floated > i.plus.icon');
    assert.equal(currentURL(), '/account/assets/new', 'transitioned to add asset page');

    await click('div.field > div.select-addon > div.dropdown');
    await click('div.dropdown > div.menu > div.item');
    await fillIn('input#asset-name', 'Phone');
    await fillIn('input#asset-description', 'This is the phone\'s description');
    await click('div.toggle');
    await click('button[type="submit"]');

    let newAsset = server.db.assets[0];

    assert.equal(newAsset.name, 'Phone', 'asset name saved correctly');
    assert.equal(newAsset.description, 'This is the phone\'s description', 'asset description saved correctly');
    assert.equal(newAsset.icon, 'mobile', 'asset icon saved correctly');
    assert.ok(newAsset.sharable, 'asset is sharable, saved correctly');

    assert.equal(currentURL(), `/account/asset/${newAsset.id}/stock`, 'transitioned correctly after save');
    assert.dom('h1.header > div.content').includesText('Phone', 'Correct asset name is displayed after save');
  });

  test('Edit asset category', async function (assert) {
    await authenticate.call(this, server);
    let originalAssetName = 'phone',
        editedAssetName = 'car',
        asset = server.create('asset', { name: originalAssetName });
    await visit(`account/asset/${asset.id}/edit`);

    assert.equal(currentURL(), `account/asset/${asset.id}/edit`, 'on asset\'s page');
    assert.dom('h1.header > div.content').includesText(originalAssetName, 'Correct asset name is displayed originally');

    await fillIn('input#asset-name', editedAssetName);
    await click('button[type="submit"]');

    let editedAsset = server.db.assets.find(asset.id);

    assert.equal(currentURL(), `/account/asset/${asset.id}/stock`);
    assert.equal(editedAsset.name, editedAssetName, 'asset name edited and saved in db correctly');
    assert.dom('h1.header > div.content').includesText(editedAssetName, 'correct asset name is displayed after edit');
  });

  test('Remove asset category', async function (assert) {
    await authenticate.call(this, server);
    let asset = server.create('asset', { name: 'Getting Deleted' });

    await visit(`account/asset/${asset.id}/stock`);
    assert.equal(currentURL(), `account/asset/${asset.id}/stock`, 'currently on asset to be removed');
    assert.equal(server.db.assets.length, 1, 'currently only one asset in db before removal');

    await click('div.right.menu > div.top.right.pointing.dropdown');
    await click('div.right.menu > div.top.right.pointing.dropdown > div.menu > div.item  a.text-danger');
    await click('div.confirm-modal > div.actions > button.green.button');

    assert.equal(currentURL(), '/account/assets', 'transitioned correctly after removal');
    assert.dom('div.ui.divided.link.items > h2.center.aligned.header').includesText('No assets available.');
    assert.equal(server.db.assets.length, 0, 'no assets in db after removal');

    let done = assert.async();
    setTimeout(() => done(), 10000);
    assert.ok(1, 'token assertion');
  });
});
