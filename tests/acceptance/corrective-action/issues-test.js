import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import authenticate from 'granite/tests/helpers/auth';
import { faker } from 'ember-cli-mirage';
import { visit, currentURL, click, fillIn, settled } from '@ember/test-helpers';

module('Acceptance | issues', function (hooks) {
  setupApplicationTest(hooks);

  test('getting to issue page', async function (assert) {
    let { employee } = await authenticate.call(this, server, {
      employee: {
        name:    { first: faker.name.firstName() },
        picture: null
      }
    });

    await visit(`/account/employee/${employee.id}`);
    await settled();
    await click(`a[href="/account/employee/${employee.id}/counseling"]`);
    await settled();

    assert.equal(currentURL(), `/account/employee/${employee.id}/counseling`);
  });

  test('checking elements on pages', async function (assert) {
    let { employee } = await authenticate.call(this, server);

    await visit(`/account/employee/${employee.id}/counseling`);
    await settled();
    assert.dom('hgroup h1').hasText('Employee Counseling');
    assert.dom('#add-issue').hasClass('plus');

    await click('#add-issue');
    await settled();
    assert.equal(currentURL(), `/account/employee/${employee.id}/counseling/new`);

    assert.dom('hgroup h1').hasText('New Employment Issue');
    assert.dom('.form > .field').exists({ count: 4 });
    assert.dom('i[class="remove icon"]').exists();
    assert.dom('.ui.positive.huge').exists();
  });

  test('adding an issue ', async function (assert) {
    let { employee } = await authenticate.call(this, server);

    await visit(`/account/employee/${employee.id}/counseling/new`);
    await settled();

    await fillIn('#issue-title input', 'alwasy late');
    await click('.search input.search');
    await click('.item.selected');
    await click('#starting-option input.search');
    await click('#starting-option .item.selected');
    await click('#exclude-users-from-issue input.search');
    await click('#exclude-users-from-issue .item.selected');
    await click('.ui.positive.huge.button');

    assert.equal(currentURL(), `/account/employee/${employee.id}/counseling/issue/1`);
  });

  test('adding a Corrective Action', async function (assert) {
    let { employee } = await authenticate.call(this, server),
        issue = await server.create('employee-issue'),
        slug = `${issue.title.replace(/\s|_/g, '-')}_${issue.id}`;

    await visit(`/account/employee/${employee.id}/counseling/issue/${slug}/`);
    await click('.ui.fluid.red.button');
    await settled();
    assert.equal(currentURL(), `/account/employee/${employee.id}/counseling/issue/${slug}/new`);

    await click('#option input');
    await click('#option .item.selected');
    await click('.ui.huge.button');
    await settled();
    assert.equal(currentURL(), `/account/employee/${employee.id}/counseling/issue/${slug}/corrective-action/1`);
  });

  test('removing a Corrective Action', async function (assert) {
    let { employee } = await authenticate.call(this, server),
        issue = await server.create('employee-issue'),
        corrective = await server.create('corrective-action'),
        slug = `${issue.title.replace(/\s|_/g, '-')}_${issue.id}`;

    await visit(`/account/employee/${employee.id}/counseling/issue/${slug}/corrective-action/${corrective.id}`);
    await settled();
    assert.equal(currentURL(), `/account/employee/${employee.id}/counseling/issue/${slug}/corrective-action/${corrective.id}`);

    await click('hgroup .trash');
    await click('div.confirm-modal:nth-child(1) > div.actions > button.green.button');
    await settled();
    assert.equal(currentURL(), `/account/employee/${employee.id}/counseling/issue/${slug}`);
  });

  test('removing an issue', async function (assert) {
    let { employee } = await authenticate.call(this, server),
        issue = await server.create('employee-issue'),
        slug = `${issue.title.replace(/\s|_/g, '-')}_${issue.id}`;

    await visit(`/account/employee/${employee.id}/counseling/issue/${slug}`);
    await settled();

    await click('hgroup .trash');
    await click('div.confirm-modal:nth-child(1) > div.actions > button.green.button');
    await settled();

    assert.equal(currentURL(), `/account/employee/${employee.id}/counseling`);
  });

  test('displaying document', async function (assert) {
    let { employee } = await authenticate.call(this, server),
        doc = await server.create('file', {
          tags:      [ 'correctiveActions' ],
          systemUse: true
        }),
        issue = await server.create('employee-issue'),
        corrective = await server.create('corrective-action', { documents: doc.id }),
        slug = `${issue.title.replace(/\s|_/g, '-')}_${issue.id}`;

    await visit(`/account/employee/${employee.id}/counseling/issue/${slug}/corrective-action/${corrective.id}`);
    await settled();
    assert.equal(currentURL(), `/account/employee/${employee.id}/counseling/issue/${slug}/corrective-action/${corrective.id}`);

    await click('.eye');
    assert.dom('div.ui.divided.items .content .header').includesText(doc.title);
    assert.dom('div.ui.divided.items .content .meta').includesText(doc.description);
  });
});
