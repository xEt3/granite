import { module, test } from 'qunit';
import { visit, currentURL, settled, typeIn, click, blur, focus } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import authenticate from 'granite/tests/helpers/auth';

module('Acceptance | search | quick results', function (hooks) {
  setupApplicationTest(hooks);

  test('search works with quick navigation', async function (assert) {
    // Just ensure that the search bar isn't showing up on the main pages
    await visit('/');
    assert.equal(currentURL(), '/', 'on homepage');
    assert.dom('.search input').doesNotExist();

    await authenticate.call(this, server);
    await settled();
    assert.dom('.search input').doesNotExist();

    await visit('/account/dashboard');
    assert.equal(currentURL(), '/account/dashboard', 'on dashboard');

    // add results
    server.create('department', { name: 'tester' });
    server.create('location', { name: 'tester' });
    let employee = server.create('employee', { firstName: 'mr testering' });

    // ensure the search (that includes an input) is in the nav
    assert.dom('nav.menu > .menu__search-input .search input').exists();
    await typeIn('.search input', 'test');
    await focus('.search input');
    await new Promise(resolve => setTimeout(resolve, 1500));
    await blur('.search input');

    await click('.search .result');
    await settled();
    assert.equal(currentURL(), `/account/employee/${employee.id}`, 'on employee page');
  });
});
