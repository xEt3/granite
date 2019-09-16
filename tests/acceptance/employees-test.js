import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import authenticate from 'granite/tests/helpers/auth';
import { faker } from 'ember-cli-mirage';
import { visit, currentURL, settled, findAll, click } from '@ember/test-helpers';

module('Acceptance | employees', function (hooks) {
  setupApplicationTest(hooks);

  test('getting to the employees', async function (assert) {
    server.createList('employee', 7);
    await authenticate.call(this, server);
    await visit('/account/dashboard');
    assert.equal(currentURL(), '/account/dashboard');
    await click('.ui.menu.account__navigation > a');
    await click('.account__sidebar > a[href="/account/employees"]');
    assert.equal(currentURL(), '/account/employees');
  });

  test('employee w/avatar shows up', async function (assert) {
    let { employee } = await authenticate.call(this, server);
    await visit('/account/employees');
    await settled();
    assert.dom(findAll('.header')[4]).includesText(employee.firstName);
    assert.dom('.ui.tiny.rounded.image img').exists();
  });

  test('employee w/o avatar shows up', async function (assert) {
    let { employee } = await authenticate.call(this, server, { employee: { picture: null } });
    await visit('/account/employees');
    await settled();
    assert.dom(findAll('.header')[4]).includesText(employee.firstName);
    assert.dom(`img[src="/api/v1/employee/${employee.id}/avatar"]`).exists();
  });

  test('checking all elements on page', async function (assert) {
    await authenticate.call(this, server, {
      employee: {
        name:    { firstName: faker.name.firstName() },
        picture: null
      }
    });
    await visit('/account/employees');
    await settled();
    assert.dom('i.filter.icon').exists();
    assert.dom('i.plus.icon').exists();
    assert.dom('.filter.icon').exists();
    assert.dom('a[href="/account/employees"]').exists();
    assert.dom('a[href="/account/employees/changes"]').exists();
    assert.dom('a[href="/account/employees/messages"]').exists();
    assert.dom('h1.ui.header.left.floated').hasText('Employees');
  });

  test('add employees menu', async function (assert) {
    await authenticate.call(this, server, {
      employee: {
        name:    { firstName: faker.name.firstName() },
        picture: null
      }
    });
    await visit('/account/employees');
    await settled();
    await click('i.plus.icon');
    await settled();
    assert.dom('a[href="/account/employees/add/new"]').hasText('One Employee');
    assert.dom('a[href="/account/employees/add/census"]').hasText('Multiple Employees');
  });

  test('filter employees', async function (assert) {
    let { employee, company } = await authenticate.call(this, server);

    let supervisor2 = await server.create('employee', { company: company.id });

    await server.create('employee', {
      supervisor: employee.id,
      company:    company.id
    });

    await server.create('employee', {
      supervisor: supervisor2.id,
      company:    company.id
    });

    await server.create('department');
    await server.create('location');
    await visit('/account/employees');
    await settled();
    await click('.filter.icon');
    await settled();
    let filters = findAll('div.ui > .segment.vertical').length;
    assert.equal(filters, 5, '5 filters showen');
    assert.dom('i.icon.remove');
    assert.dom('.negative.ui.button.small.text').hasText('Reset All');

    for (let i = 2; i <= filters + 1; i++) {
      assert.dom(`div:nth-child(${i}) > h4 > i.down`).exists();
      await click(`div:nth-child(${i}) > h4`);
      assert.dom(`div:nth-child(${i}) > h4 > i.up`).exists();
    }

    [ 'Select a Supervisor', 'Select a Department', 'Select a Location' ].forEach((filter, i) => {
      assert.dom(`div:nth-child(${i + 2}) > div > div > div > div.default.text`).hasText(filter);
      assert.equal(findAll(`div:nth-child(${i + 2}) > div > div > div > div > div.item`).length > 1, true, `${filter} dropdown has more than one option`);
    });

    for (let i = 1; i <= 2; i++) {
      await click(`div.ui.calendar.field:nth-child(${i}) > div.ui.input > input`);
      assert.dom(`div.ui.calendar.field:nth-child(${i}) > div > div`).hasClass('active');
      await new Promise(resolve => setTimeout(resolve, 500));
      await click(`div.ui.calendar.field:nth-child(${i}) > div > div > table > tbody > tr:nth-child(3) > td.link:nth-child(${i + 1})`);
      await click(`div.ui.calendar.field:nth-child(${i}) tr:nth-child(1) > td.link:nth-child(${i + 1})`);
      await click(`div.ui.calendar.field:nth-child(${i}) tr:nth-child(2) > td.link:nth-child(2)`);
      assert.dom(`div.ui.calendar.field:nth-child(${i}) > div > input[type="text"]`).hasValue(`${i === 1 ? 'February 5, 2018' : 'March 4, 2019'}`);
    }

    await click('.remove.icon');
    await settled();
    assert.dom('h3 > div > a > i.filter.icon').exists();
  });

});
