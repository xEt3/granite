import { module, test } from 'qunit';
import { visit, currentURL, settled, typeIn, triggerKeyEvent } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import authenticate from 'granite/tests/helpers/auth';

module('Acceptance | search | full results', function (hooks) {
  setupApplicationTest(hooks);

  test('search bar shows on the account menu', async function (assert) {
    // Just ensure that the search bar isn't showing up on the main pages
    await visit('/');
    assert.equal(currentURL(), '/', 'on homepage');
    assert.dom('.search input').doesNotExist();

    await authenticate.call(this, server);
    await settled();
    assert.dom('.search input').doesNotExist();

    await visit('/account/dashboard');
    assert.equal(currentURL(), '/account/dashboard', 'on dashboard');

    // ensure the search (that includes an input) is in the nav
    assert.dom('nav.menu > .menu__search-input .search input').exists();
    await focus('.search input');
    await typeIn('.search input', 'test');
    await new Promise(resolve => setTimeout(resolve, 1500));

    await triggerKeyEvent('.search input', 'keypress', 'Enter');
    await settled();
    assert.equal(currentURL(), '/account/search', 'on results page');
  });
});
