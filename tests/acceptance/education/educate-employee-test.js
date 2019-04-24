import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import authenticate from 'granite/tests/helpers/auth';
// import { faker } from 'ember-cli-mirage';
import { visit, currentURL, click, settled, findAll } from '@ember/test-helpers';
// import moment from 'moment';

module('Acceptance | Educate | Employee Page', function (hooks) {
  setupApplicationTest(hooks);

  test('menu item to "Education & Training" exists & works', async function (assert) {
    let { employee } = await authenticate.call(this, server);

    await visit(`/account/employee/${employee.id}`);
    assert.equal(currentURL(), `/account/employee/${employee.id}`);

    assert.dom('.menu__employee-page .menu-employee-page__more').exists();
    await click('.menu__employee-page .menu-employee-page__more');
    await settled();

    let linkSelector = `
      .menu__employee-page
      .menu-employee-page__more
      .menu
      a[href="/account/employee/${employee.id}/education"]
    `;
    assert.dom(linkSelector).includesText('Education & Training');
    await click(linkSelector);
    assert.equal(currentURL(), `/account/employee/${employee.id}/education`);
  });

  test('education landing page display', async function (assert) {
    let { employee } = await authenticate.call(this, server);

    await visit(`/account/employee/${employee.id}/education`);
    assert.equal(currentURL(), `/account/employee/${employee.id}/education`);

    assert.dom('.ui.segment > hgroup > h1').includesText('Education');
    await click('.ui.segment .menu__actions #add-education');
    await settled();

    assert.equal(findAll('.ui.segment .menu__actions .menu > a').length, 2, 'Has two menu items');
    assert.dom('.header__list:first-of-type').includesText('Certifications');
    assert.dom('.header__list:last-of-type').includesText('Training Assignments');
    assert.dom('.header__list:first-of-type + .ui.list').includesText('No certifications');
    assert.dom('.header__list:last-of-type + .ui.list').includesText('No training');
  });
});
