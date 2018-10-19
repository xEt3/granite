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
    // no results
    assert.dom('.search__descriptor').hasText('No results found');
    assert.dom('.search__result-item').doesNotExist();

    await visit('/account/dashboard');
    assert.equal(currentURL(), '/account/dashboard', 'on dashboard again');

    // add results
    let department = server.create('department', { name: 'tester' }),
        location = server.create('location', { name: 'tester' }),
        employee = server.create('employee', { firstName: 'mr testering' });

    assert.dom('nav.menu > .menu__search-input .search input').exists();
    await focus('.search input');
    await typeIn('.search input', 'test');
    await new Promise(resolve => setTimeout(resolve, 1500));

    await triggerKeyEvent('.search input', 'keypress', 'Enter');
    await settled();
    assert.equal(currentURL(), '/account/search', 'on results page');

    assert.dom('.search__result-item').exists({ count: 3 });
    assert.dom('.search__result-category').exists({ count: 3 });
    assert.dom('.search__result-category:nth-child(1)').hasText('Employees');
    assert.dom('.search__result-category:nth-child(2)').hasText('Departments');
    assert.dom('.search__result-category:nth-child(3)').hasText('Locations');

    // assert result item by nth-child for each model
    assert.dom('.search__result-item:nth-child(1) > .search-result__title').hasText(employee.fullName);
    assert.dom('.search__result-item:nth-child(1) > .search-result__description').hasText(employee.jobTitle);

    assert.dom('.search__result-item:nth-child(2) > .search-result__title').hasText(department.name);
    assert.dom('.search__result-item:nth-child(2) > .search-result__description').doesNotExist();

    assert.dom('.search__result-item:nth-child(3) > .search-result__title').hasText(location.name);
    assert.dom('.search__result-item:nth-child(3) > .search-result__description').hasText(location.addressLine1);
  });
});
