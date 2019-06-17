import { module, test } from 'qunit';
import { visit, currentURL, click, findAll, fillIn } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import authenticate from 'granite/tests/helpers/auth';

module('Acceptance | settings/lists', function (hooks) {
  setupApplicationTest(hooks);

  test('Can navigate to lists page and list displays', async function (assert) {
    let { company } = await authenticate.call(this, server);

    await visit('/account/settings/general');
    await click('a[href="/account/settings/general/lists"]');
    assert.equal(currentURL(), '/account/settings/general/lists', 'can get to lists page');
    assert.dom('div.ui.vertical.fluid.tabular.menu > a.item').includesText('Disqualification Reasons');

    assert.dom('div.ui.grid > div.twelve.wide.stretched.column > div.ui.relaxed.divided.list > div.item').isNotVisible('no list items are visible yet because list hasnt been clicked');
    assert.dom('div.ui.relaxed.divided.list > a.item').isNotVisible('Add list item option is not available yet');
    await click('div.ui.vertical.fluid.tabular.menu > a.item');
    assert.dom('div.ui.grid > div.twelve.wide.stretched.column > div.ui.relaxed.divided.list > div.item').isVisible('list items are now visible after clicking list');
    assert.dom('div.ui.relaxed.divided.list > a.item').includesText('New item...', 'add item option is visible');
    assert.dom('button.ui.green.fluid.button').isNotVisible('save button is hidden because list is not dirty');
    assert.equal(await findAll('div.ui.relaxed.divided.list > div.item').length, company.disqualificationReasons.length, 'Num of displayed items should match company');
  });

  test('Can add list item and save', async function (assert) {
    let { company } = await authenticate.call(this, server);

    await visit('/account/settings/general/lists?list=dqReasons');
    await click('div.ui.relaxed.divided.list > a.item');
    assert.dom('div.modal > div.header').includesText('Add', 'Header says adding');
    assert.dom('div.modal button.ui.green.button').includesText('Add', 'Save button says add');
    await fillIn('input[name="currentItem"]', 'added item');
    await click('button.ui.green.right.button');
    assert.equal(await findAll('div.ui.relaxed.divided.list > div.item').length, 13, 'Num of displayed is correct after adding');
    assert.dom('div.ui.relaxed.divided.list > .item:nth-child(14)').includesText('added item', 'newly added item is displayed');

    assert.equal(company.disqualificationReasons.length, 12, 'Num of items on model is correct');
    assert.dom('button.ui.green.fluid.button').isVisible('save button is visible after list dirtied');
    await click('button.ui.green.fluid.button');
    assert.dom('button.ui.green.fluid.button').isNotVisible('save button disappears after save');

    assert.equal(await findAll('div.ui.relaxed.divided.list > div.item').length, 13, 'Num of displayed is correct after saving');
    assert.dom('div.ui.relaxed.divided.list > .item:nth-child(14)').includesText('added item', 'newly added item is displayed after save');

    let { disqualificationReasons } = server.db.companies.find(company.id);
    assert.equal(disqualificationReasons.length, 13, 'Num of items on model is correct after save');
    assert.equal(disqualificationReasons[12], 'added item', 'last item on model is newly added item');
  });

  test('Can edit list item and save', async function (assert) {
    let { company } = await authenticate.call(this, server);

    await visit('/account/settings/general/lists?list=dqReasons');
    await click('div.ui.relaxed.divided.list > .item:nth-child(5) > span.right.floated > a');
    assert.dom('input[name="currentItem"]').hasValue('Failed test', 'correct value filled in initially');
    assert.dom('div.modal > div.header').includesText('Edit', 'Header says editing');
    assert.dom('div.modal button.ui.green.button').includesText('Edit', 'Save button says edit');

    await fillIn('input[name="currentItem"]', 'newly edited item');
    await click('div.modal button.ui.green.button');

    assert.dom('div.ui.relaxed.divided.list > .item:nth-child(5)').hasText('newly edited item', 'edited list item displays new text');
    assert.equal(company.disqualificationReasons[3], 'Failed test', 'db entry is unchanged');
    assert.equal(company.disqualificationReasons.length, 12, 'db length should never change');
    assert.dom('button.ui.green.fluid.button').isVisible('save button is visible after list dirtied');

    await click('button.ui.green.fluid.button');
    assert.dom('button.ui.green.fluid.button').isNotVisible('save button disappears after save');
    assert.equal(company.disqualificationReasons[3], 'newly edited item', 'db entry is unchanged');
    assert.equal(company.disqualificationReasons.length, 12, 'db length should never change');
  });

  test('Can delete list item and save', async function (assert) {
    let { company } = await authenticate.call(this, server);

    await visit('/account/settings/general/lists?list=dqReasons');
    assert.dom('button.ui.green.fluid.button').isNotVisible('save button is not visible before deletion');
    await click('div.ui.relaxed.divided.list > .item:nth-child(5) > span.right.floated > a:nth-child(2)');
    assert.dom('div.ui.relaxed.divided.list > .item:nth-child(5)').doesNotIncludeText('Failed test', 'list item with text \'Failed test\' was removed');

    assert.equal(await findAll('div.ui.relaxed.divided.list > div.item').length, 11, 'displays 11 list items after deletion');
    assert.equal(company.disqualificationReasons.length, 12, 'still 12 list items on company model because no save yet');
    assert.dom('button.ui.green.fluid.button').isVisible('save button is visible after list dirtied');

    await click('button.ui.green.fluid.button');
    assert.equal(await findAll('div.ui.relaxed.divided.list > div.item').length, 11, 'still displays 11 list items after deletion and save');
    assert.equal(company.disqualificationReasons.length, 11, '11 list items on company model because of save');
  });
});
