import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import authenticate from 'granite/tests/helpers/auth';
import { faker } from 'ember-cli-mirage';
import { visit, currentURL, click, find, findAll, settled } from '@ember/test-helpers';
import moment from 'moment';

module('Acceptance | employee', function (hooks) {
  setupApplicationTest(hooks);

  test('getting to employee page', async function (assert) {
    let { employee } = await authenticate.call(this, server, {
      employee: {
        name:    { first: faker.name.firstName() },
        picture: null
      }
    });

    await visit('/account/employees');
    await settled();
    await click(`a[href="/account/employee/${employee.id}"]`);
    await settled();
    assert.equal(currentURL(), `/account/employee/${employee.id}`);
  });

  test('checking elements on page', async function (assert) {
    let { employee } = await authenticate.call(this, server);

    await visit('/account/employees');
    await settled();
    await click(`a[href="/account/employee/${employee.id}"]`);
    await settled();
    assert.equal(currentURL(), `/account/employee/${employee.id}`);
    assert.equal(find('.account__breadcrumb').textContent.trim().replace(/\s\s+|\n/g, ''), 'Account/Employees/Employee', 'bread crumbs are there');
    assert.dom('div.dropdown.ui.pointing').exists();
    await click('div.dropdown.ui.pointing');
    assert.dom(`a[href="/account/employee/${employee.id}/edit/personal"]`).exists();
    assert.equal(findAll('.transition div.item').length, 2, 'resend and edit are on page');
    assert.dom('div.text-danger').exists();
    assert.dom('div.ui.pointing.menu').exists();
    assert.equal(findAll('div.ui.pointing.menu > a.item').length, [ 4 ], 'all the menu items are on page ');
    assert.dom('div.center.text-white > div').hasText('Edit Picture');
    assert.dom(`a[href="tel:${employee.phone}"]`).exists();
    assert.dom(`a[href="mailto:${employee.email}"]`).exists();
    assert.equal(findAll('.ui.stackable.two.column.grid .ui.raised.segment').length, [ 6 ], 'all the segments are on page');
    assert.equal(findAll('.ui.stackable.two.column.grid .pencil.icon').length, [ 6 ], 'all the pencil are on page');
    assert.dom('.ui.stackable.two.column.grid .ui.basic.segment a').hasText(employee.email);
    assert.dom('.ui.stackable.two.column.grid .ui.basic.segment a:nth-child(3)').hasText(employee.phone.replace(/\D/g, '').replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3'));
    [
      [ 'Direct Contact', 'Mailing Address', 'Custom Fields' ],

      [ 'Additional Information', 'Anniversaries', 'Emergency Contact' ]
    ].forEach((column, columnIndex) => column.forEach((header, i) => {
      assert.dom(`.ui.stackable.two.column.grid .column:nth-child(${columnIndex + 1}) .raised.segment:nth-child(${i + 1}) span`).hasText(header);
    }));

    assert.dom('.segment.ui p.text div').hasText('SSN ***-**-4444');
    await click('div.line-item-value u a i.icon');
    assert.dom('.segment.ui p.text div').hasText('SSN 123-12-4444');
    assert.dom('div.column:nth-child(1) .raised:nth-child(2) div.segment.basic').hasText(`${employee.addressLine1}, ${employee.addressCity}, ${employee.addressState} ${employee.addressZip}`);
    assert.dom('.column .raised:nth-child(2) .basic p.text').hasText(`Date of Birth: ${moment(employee.dateOfBirth).format('M/D/YY')}`);
    assert.dom('div.list div.line-item-value u').hasText(Object.values(employee.customFields)[0]);
    assert.dom('div.column:nth-child(2) .raised:nth-child(3) div.segment.basic').includesText(`${employee.emergencyContactNameFirst} ${employee.emergencyContactNameLast}`);
    assert.dom('.employee-basic-meta').includesText(employee.firstName);
  });

  test('employee equipment page', async function (assert) {
    let { employee } = await authenticate.call(this, server);
    await server.create('asset-item');
    await visit('/account/employees');
    await settled();
    await click(`a[href="/account/employee/${employee.id}"]`);
    assert.equal(currentURL(), `/account/employee/${employee.id}`);
    await click(`a[href="/account/employee/${employee.id}/equipment"]`);
    await settled();
    assert.equal(currentURL(), `/account/employee/${employee.id}/equipment`);
    assert.dom('.ui.centered.card').exists();
    assert.dom('.ui.centered.card .ui.bottom.attached.button').hasText('Unassign asset');
    assert.dom(`img[src="/api/v1/employee/${employee.id}/avatar"]`).exists();
    assert.dom('.plus.icon.text-white').exists();
    await click('.plus.icon.text-white');
    await settled();
    assert.dom('.inline.right.pointing > div.transition > div.header').hasText('Click Equipment to Assign');
  });

  test('employee changes page', async function (assert) {
    let { employee } = await authenticate.call(this, server);
    await visit('/account/employees');
    await settled();
    await click(`a[href="/account/employee/${employee.id}"]`);
    await settled();
    assert.equal(currentURL(), `/account/employee/${employee.id}`);
    await click(`a[href="/account/employee/${employee.id}/history"]`);
    await settled();
    assert.equal(currentURL(), `/account/employee/${employee.id}/history`);
    assert.dom(`img[src="/api/v1/employee/${employee.id}/avatar"]`).exists();
  });

  test('employee counseling page', async function (assert) {
    let { employee } = await authenticate.call(this, server);
    await visit('/account/employees');
    await settled();
    await click(`a[href="/account/employee/${employee.id}"]`);
    await settled();
    assert.equal(currentURL(), `/account/employee/${employee.id}`);
    await click(`a[href="/account/employee/${employee.id}/counseling"]`);
    await settled();
    assert.equal(currentURL(), `/account/employee/${employee.id}/counseling`);
    assert.dom(`img[src="/api/v1/employee/${employee.id}/avatar"]`).exists();
  });
});
