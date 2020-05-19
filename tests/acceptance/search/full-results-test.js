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
    assert.equal(currentURL(), '/account/search?q=test', 'on results page');

    // no results
    assert.dom('.search__no-results').hasText('No results found.');
    assert.dom('.search__result-item').doesNotExist();

    await visit('/account/dashboard');
    assert.equal(currentURL(), '/account/dashboard', 'on dashboard again');

    // add results
    server.create('department', { name: 'tester' });
    server.create('location', { name: 'tester' });
    server.create('employee', { firstName: 'mr testering' });
    assert.dom('nav.menu > .menu__search-input .search input').exists();
    await focus('.search input');
    await typeIn('.search input', 'test');
    await new Promise(resolve => setTimeout(resolve, 1500));

    await triggerKeyEvent('.search input', 'keypress', 'Enter');
    await settled();
    assert.equal(currentURL(), '/account/search?q=test', 'on results page');

    assert.dom('.search__result-item').exists({ count: 3 });
    assert.dom('.search__result-category').exists({ count: 3 });
    assert.dom('.search__container .search__result-category:nth-child(3)').hasText('Employees');
    assert.dom('.search__container .search__result-category:nth-child(5)').hasText('Departments');
    assert.dom('.search__container .search__result-category:nth-child(7)').hasText('Locations');
  });
});
