import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import authenticate from 'granite/tests/helpers/auth';
import { visit, currentURL, click, find, settled, fillIn } from '@ember/test-helpers';

module('Acceptance | edit action items', function (hooks) {
  setupApplicationTest(hooks);

  test('getting to the action item edit page', async function (assert) {
    let { employee } = await authenticate.call(this, server);

    let action = await server.create('action-item', {
      title:         'apples',
      prerequisites: [],
      owner:         employee
    });

    await visit(`/account/project/${action.title}`);
    assert.equal(currentURL(), `/account/project/${action.title}`);
    await click('h2 > a > i.edit.fitted.icon');
    await settled();
    assert.equal(currentURL(), `/account/project/${action.title}/edit`);
  });

  test('elements on action item edit page', async function (assert) {
    let { employee } = await authenticate.call(this, server);

    let action = await server.create('action-item', {
      title:         'apples',
      prerequisites: [],
      owner:         employee
    });

    await visit(`/account/project/${action.title}/edit`);
    assert.equal(find('.account__breadcrumb').textContent.trim().replace(/\s\s+|\n/g, ''), 'Account/Projects/Project/Edit');
    assert.dom('label[for="action-item-title"').hasText('Title');
    assert.dom('input#action-item-title').hasValue(action.title);
    assert.dom('div:nth-child(2) > label').hasText('Description');
    assert.dom('div.field > textarea[placeholder="Description"]').hasValue(action.description);
    assert.dom('span.irs > span.irs-single').hasText(`${action.priority}`);
    assert.dom('label[for="action-item-prerequisites"]').hasText('Prerequisites');
    assert.dom('#action-item-prerequisites > div.default.text').isVisible();
    await settled();
    await click('#action-item-prerequisites');
    await settled();
    await click('div#action-item-prerequisites .menu > .item');
    await settled();
    assert.dom('div#action-item-prerequisites > a.ui.label').hasText(action.title);
    assert.dom('form > button').isVisible();
  });

  test('edit action item', async function (assert) {
    let { employee, company } = await authenticate.call(this, server);

    let action = await server.create('action-item', {
      title:         'apples',
      prerequisites: [],
      owner:         employee,
      company:       company
    });

    await visit(`/account/project/${action.title}/edit`);
    await fillIn('input#action-item-title', `${action.title}`);
    await fillIn('div.field > textarea[placeholder="Description"]', `${action.description} testing this`);
    assert.dom('input#action-item-title').hasValue(`${action.title}`);
    assert.dom('div.field > textarea[placeholder="Description"]').hasValue(`${action.description} testing this`);
    await settled();
    await click('#action-item-prerequisites');
    await settled();
    await click('div#action-item-prerequisites .menu > .item');
    await settled();
    assert.dom('div#action-item-prerequisites > a.ui.label').hasText(`${action.title}`);
    await click('form > button');
    assert.equal(currentURL(), `/account/project/${action.title}`);
  });
});
