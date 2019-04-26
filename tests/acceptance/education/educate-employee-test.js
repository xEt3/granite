import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import authenticate from 'granite/tests/helpers/auth';
// import { faker } from 'ember-cli-mirage';
import { visit, currentURL, click, settled, findAll, fillIn } from '@ember/test-helpers';
import moment from 'moment';

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

  test('adding a certification', async function (assert) {
    let { employee } = await authenticate.call(this, server);

    await visit(`/account/employee/${employee.id}/education`);
    assert.equal(currentURL(), `/account/employee/${employee.id}/education`, 'on education page');

    await click('.ui.segment .menu__actions #add-education');
    await settled();
    await click(`.ui.segment .menu__actions .menu > a[href="/account/employee/${employee.id}/education/add?type=certification"]`);
    await settled();
    assert.equal(currentURL(), `/account/employee/${employee.id}/education/add?type=certification`, 'on cert add page');

    const controller = this.owner.lookup('controller:account/employee/index/education/add');
    const mockData = {
      name:                'Test',
      note:                'Some notes',
      renews:              true,
      renewalPeriodAmount: 1,
      renewalPeriodUnit:   'years'
    };
    const mockDataKeys = Object.keys(mockData);

    let initialDate = moment().format('M/D/YY');

    await fillIn('input[name="name"]', mockData.name);
    await fillIn('.notes textarea', mockData.note);
    await fillIn('.initial-date input', initialDate);
    await click('#renews');
    await settled();
    assert.dom('.renews-every').isVisible();
    await click('#requires-document');
    await settled();

    assert.deepEqual(
      controller.get('model').getProperties(...mockDataKeys),
      mockData,
      'model properties were set'
    );

    await click('button[type="submit"]');
    await settled();
    assert.equal(currentURL(), `/account/employee/${employee.id}/education`, 'on education page');

    assert.equal(server.db.certifications.length, 1, 'one certification in mirage db');
    assert.deepEqual(
      [ ...mockDataKeys, 'employeeId' ].reduce((pjo, key) => ({
        ...pjo,
        [key]: server.db.certifications[0][key]
      }), {}),
      {
        ...mockData,
        employeeId: employee.id
      },
      'certification in db has same props'
    );

    assert.dom('.header__list:first-of-type + .ui.list .item').exists();
  });

  test('adding a training assignment', async function (assert) {
    let { employee } = await authenticate.call(this, server);

    await visit(`/account/employee/${employee.id}/education`);
    assert.equal(currentURL(), `/account/employee/${employee.id}/education`, 'on education page');

    await click('.ui.segment .menu__actions #add-education');
    await settled();
    await click(`.ui.segment .menu__actions .menu > a[href="/account/employee/${employee.id}/education/add?type=training%20assignment"]`);
    await settled();
    assert.equal(currentURL(), `/account/employee/${employee.id}/education/add?type=training%20assignment`, 'on training assignment add page');

    const controller = this.owner.lookup('controller:account/employee/index/education/add');
    const mockData = {
      name:   'Test',
      note:   'Some notes',
      status: 'Assigned'
    };
    const mockDataKeys = Object.keys(mockData);

    await fillIn('input[name="name"]', mockData.name);
    await fillIn('.notes textarea', 'Some notes');

    assert.deepEqual(
      controller.get('model').getProperties(...mockDataKeys),
      mockData,
      'model properties were set'
    );

    await click('button[type="submit"]');
    await settled();
    assert.equal(currentURL(), `/account/employee/${employee.id}/education`, 'on education page');

    assert.equal(server.db.trainingAssignments.length, 1, 'one assignment in mirage db');
    assert.deepEqual(
      [ ...mockDataKeys, 'employeeId' ].reduce((pjo, key) => ({
        ...pjo,
        [key]: server.db.trainingAssignments[0][key]
      }), {}),
      {
        ...mockData,
        employeeId: employee.id
      },
      'training assignment in db has same props'
    );

    assert.dom('.header__list:last-of-type + .ui.list .item').exists();
  });
});
