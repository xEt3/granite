import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import authenticate from 'granite/tests/helpers/auth';
import { visit, currentURL, click, find, settled, fillIn, pauseTest } from '@ember/test-helpers';

module('Acceptance | edit action items', function (hooks) {
  setupApplicationTest(hooks);

  test('getting to the action item edit page', async function (assert) {
    let { employee } = await authenticate.call(this, server);

    let action = await server.create('action-items', {
      title:         'apples',
      prerequisites: [],
      owner:         employee
    });

    await visit(`/account/action-item/${action.title}`);
    assert.equal(currentURL(), `/account/action-item/${action.title}`);
    await click('h2 > a > i.edit.fitted.icon');
    await settled();
    assert.equal(currentURL(), `/account/action-item/${action.title}/edit`);
  });

  test('elements on action item edit page', async function (assert) {
    let { employee } = await authenticate.call(this, server);

    let action = await server.create('action-items', {
      title:         'apples',
      prerequisites: [],
      owner:         employee
    });

    await visit(`/account/action-item/${action.title}/edit`);
    assert.equal(find('.account__breadcrumb').textContent.trim().replace(/\s\s+|\n/g, ''), 'Account/Action Items/Action Item/Edit');
    assert.dom('div.field.ember-view > label').hasText('Title');
    assert.dom('input#action-item-title').hasValue(action.title);
    assert.dom('div:nth-child(2) > label').hasText('Description');
    assert.dom('div:nth-child(2) > textarea').hasValue(action.description);
    assert.dom('span.irs > span.irs-single').hasText(`${action.priority}`);
    assert.dom('label > span').hasText('Prerequisites');
    assert.dom('#action-item-prerequisites > div.default.text').isVisible();
    await click('#action-item-prerequisites');
    await new Promise(resolve => setTimeout(resolve, 500));
    await click('div#action-item-prerequisites div.menu.left.transition.visible > div');
    await settled();
    assert.dom('div#action-item-prerequisites > a.ui.label').hasText(action.title);
    assert.dom('form > button').isVisible();
  });

  test('edit action item', async function (assert) {
    let { employee, company } = await authenticate.call(this, server);

    let action = await server.create('action-items', {
      title:         'apples',
      prerequisites: [],
      owner:         employee,
      company:       company
    });

    await visit(`/account/action-item/${action.title}/edit`);
    await fillIn('input#action-item-title', `${action.title}`);
    await fillIn('div:nth-child(2) > textarea', `${action.description} testing this`);
    assert.dom('input#action-item-title').hasValue(`${action.title}`);
    assert.dom('div:nth-child(2) > textarea').hasValue(`${action.description} testing this`);
    await click('div#action-item-prerequisites > i.dropdown.icon');
    await new Promise(resolve => setTimeout(resolve, 500));
    await click('div#action-item-prerequisites div.menu.left.transition.visible > div');
    await settled();
    assert.dom('div#action-item-prerequisites > a.ui.label').hasText(`${action.title}`);
    await click('form > button');
    assert.equal(currentURL(), `/account/action-item/${action.title}`);
  });
});
