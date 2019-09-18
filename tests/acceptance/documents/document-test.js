import { module, test } from 'qunit';
import authenticate from 'granite/tests/helpers/auth';
import { visit, currentURL, click, findAll } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | document', function (hooks) {
  setupApplicationTest(hooks);

  test('correct document details display for image', async function (assert) {
    await authenticate.call(this, server);
    let doc = await server.create('file');

    await visit(`/account/document/${doc.id}`);
    assert.equal(currentURL(), `/account/document/${doc.id}`);

    assert.dom('hgroup > h2 > i.icon').hasClass('image', 'image icon is displayed');
    assert.dom('hgroup > h2').includesText(doc.title, 'document title is displayed on page');
    assert.dom('div.content > div.clearfix > h4').includesText(doc.description, 'description displayed on page');
    assert.dom('div.content > div.clearfix > img.ui.small.rounded.image').isVisible('document picture is displayed');
    assert.dom('div.container.clearfix > span.ui.small.text').includesText(moment(doc.created).format('M/D/YY'), 'created date is displayed correctly');
  });

  test('word icon is displayed on word doc', async function (assert) {
    await authenticate.call(this, server);
    let doc = await server.create('file', { extension: 'docx' });

    await visit(`/account/document/${doc.id}`);

    assert.dom('hgroup > h2 > i.icon').hasClass('word', 'word icon is displayed');
    assert.dom('div.content > div.clearfix > img').isNotVisible('no picture is displayed because its a word doc');
  });

  test('assignee info displayed correctly', async function (assert) {
    let { employee } = await authenticate.call(this, server);
    let doc = await server.create('file');
    await server.create('file-assignment', { employee: employee.id });
    await server.create('file-assignment', {
      employee: employee.id,
      signedOn: null,
      readOn:   null
    });

    await visit(`/account/document/${doc.id}`);

    assert.dom('div.file-assignment-item > div.label > a').includesText(employee.firstName, 'assignment label has first name');
    assert.dom('div.file-assignment-item > div.label > a').includesText(employee.lastName, 'assignment label has last name');
    assert.dom('div.file-assignment-item > div.label > a').hasAttribute('href', `/account/employee/${employee.id}`, 'name is linked to employee\'s page');
    assert.equal(findAll('div.file-assignment-item').length, 2, 'two file assignments listed');
    assert.equal(findAll('div.file-assignment-item > div.label i.eye.gray-icon').length, 1, 'only one of the assignments says read');
    assert.equal(findAll('div.file-assignment-item > div.label i.edit.icon').length, 1, 'only one of the assignments says signed');
  });

  test('can assign document to employee', async function (assert) {
    let { employee } = await authenticate.call(this, server);
    let doc = await server.create('file');

    await visit(`/account/document/${doc.id}`);

    assert.equal(findAll('div.file-assignment-item').length, 0, 'no assignments listed');

    await click('div.right.menu > div.pointing.ui.dropdown');
    await click('div.ui.dropdown > div.menu > div.item > a[href="#"]');
    await click('div#assign-to > div.menu > div.item');
    await click('div.actions > button.primary');

    assert.equal(findAll('div.file-assignment-item').length, 1, 'one file assignments listed');
    assert.dom('div.file-assignment-item > div.label > a').includesText(employee.firstName, 'assignment label has first name');
    assert.dom('div.file-assignment-item > div.label > a').includesText(employee.lastName, 'assignment label has last name');
  });

  test('can delete document', async function (assert) {
    await authenticate.call(this, server);
    let doc = await server.create('file');

    assert.equal(server.db.files.length, 1, '1 file in db');

    await visit(`/account/document/${doc.id}`);
    await click('div.right.menu > div.pointing.ui.dropdown');
    await click('div.ui.dropdown > div.menu > div:nth-child(3) > div > a[href="#"]');
    await click('button.green');

    assert.equal(server.db.files.length, 0, '0 files in db after delete');
  });
});
