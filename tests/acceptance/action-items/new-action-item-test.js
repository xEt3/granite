import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import authenticate from 'granite/tests/helpers/auth';
import { visit, currentURL, click, settled, fillIn } from '@ember/test-helpers';

module('Acceptance | new action items', function (hooks) {
  setupApplicationTest(hooks);

  test('adding a new action item', async function (assert) {
    await authenticate.call(this, server);
    await visit('/account/projects');
    await click('h2 > a > i.plus');
    assert.equal(currentURL(), '/account/projects/new');
  });

  test('elements show on page', async function (assert) {
    await authenticate.call(this, server);
    await visit('/account/projects/new');
    assert.dom('div > h2.header').hasText('Create a New Project');
    assert.dom('div > div:nth-child(1) > label').hasText('Title');
    assert.dom('div > div:nth-child(2) > label').hasText('Description');
    assert.dom('input#action-item-title').isVisible();
    assert.dom('div:nth-child(2) > textarea').isVisible();
    assert.dom('div.field.ui.calendar.ember-view > label').hasText('Assign a Due Date');
    assert.dom('div.ui.calendar.field input[type="text"]').isVisible();
    assert.dom('div:nth-child(5) > label').hasText('Priority');
    assert.dom('label[for="action-item-prerequisites"]').hasText('Prerequisites');
    assert.dom('span > span.irs').isVisible();
    assert.dom('span.irs > span.irs-single').hasText('1');
    assert.dom('div div:nth-child(6) > p').hasText('No other projects are available.');
    assert.dom('div.ui.basic.text.segment.container > div > div > h4').hasText('Build a todo');
    assert.dom('div#new-todo-assigned-to > input').isVisible();
    assert.dom('div#new-todo-assigned-to > div.menu.transition.visible').isNotVisible();
    await click('div#new-todo-assigned-to > input');
    await new Promise(resolve => setTimeout(resolve, 500));
    assert.dom('div#new-todo-assigned-to > div.menu.transition.visible').isVisible();
    await click('div#new-todo-assigned-to div.item.selected');
    assert.dom('div#new-todo-assigned-to > div.text').hasText('No Assignee');
    assert.dom('form:nth-child(12) > button').isVisible();
  });

  test('adding new item', async function (assert) {
    await authenticate.call(this, server);
    await visit('/account/projects/new');
    await fillIn('input#action-item-title', 'check the fridge');
    await fillIn('div:nth-child(2) > textarea', 'oh snap I am full');
    await fillIn('div.ui.calendar.field input[type="text"]', 'September 18, 2178');
    assert.dom('input#action-item-title').hasValue('check the fridge');
    assert.dom('div:nth-child(2) > textarea').hasValue('oh snap I am full');
    assert.dom('div.ui.calendar.field input[type="text"]').hasValue('September 18, 2178');
    await click('form:nth-child(12) > button');
    await settled();
    assert.equal(currentURL(), '/account/project/check-the-fridge');
  });
});
