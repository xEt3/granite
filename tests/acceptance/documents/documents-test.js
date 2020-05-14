import { module, test } from 'qunit';
import authenticate from 'granite/tests/helpers/auth';
import { visit, currentURL, click, fillIn } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | documents', function (hooks) {
  setupApplicationTest(hooks);

  test('getting to documents', async function (assert) {
    await authenticate.call(this, server, { companyUser: { shownHints: [] } });

    try {
      await visit('/account/documents');
    } catch (err) {
      // noop. This is a hack for https://github.com/emberjs/ember-test-helpers/issues/332
    }

    await click('.huge.blue.button');
    assert.equal(currentURL(), '/account/documents');
  });

  test('elements on documents page', async function (assert) {
    await authenticate.call(this, server, { companyUser: { shownHints: [] } });

    try {
      await visit('/account/documents');
    } catch (err) {
      // noop. This is a hack for https://github.com/emberjs/ember-test-helpers/issues/332
    }

    await click('.huge.blue.button');

    assert.dom('.ui.header.left').hasText('Documents');
    assert.dom('.plus.icon').isVisible();
    assert.dom('h2.ui.center.aligned.header').hasText('No files available.');
    assert.dom('.ui.pagination.menu').isVisible();
  });

  test('adding a new document', async function (assert) {
    await authenticate.call(this, server, { companyUser: { shownHints: [] } });

    try {
      await visit('/account/documents');
    } catch (err) {
      // noop. This is a hack for https://github.com/emberjs/ember-test-helpers/issues/332
    }

    await click('.huge.blue.button');
    await click('.plus.icon');

    assert.equal(currentURL(), '/account/documents/new');
    assert.dom('.ui.dividing.header').hasText('Add a New Document');
    assert.dom('#input__dropzone--document').isVisible();
    assert.dom('label[for="file-title"]').hasText('File Title');
    assert.dom('input[placeholder="File Title"]').isVisible();
    assert.dom('label[for="file-tags"]').hasText('File Tags');
    assert.dom('input.search').isVisible();
    assert.dom('.green.button').isVisible();
    assert.dom('label[for="file-description"]').isNotVisible();
    assert.dom('.field.center.aligned.text > a').hasText('Show Description');
    await click('.angle.down.icon');
    assert.dom('label[for="file-description"]').isVisible();
    assert.dom('#file-description').isVisible();

    await fillIn('input[placeholder="File Title"]', 'hello');
    await fillIn('#file-description', 'this is a description');
    await click('.fluid.multiple.search.selection.ui.dropdown');
    await click('div.menu > div.item');
    await click('.green.button');
  });

  test('document is on page', async function (assert) {
    await authenticate.call(this, server, { companyUser: { shownHints: [] } });
    let file = await server.create('file');

    try {
      await visit('/account/documents');
    } catch (err) {
      // noop. This is a hack for https://github.com/emberjs/ember-test-helpers/issues/332
    }

    await click('.huge.blue.button');

    assert.dom('.clearing > div.header').includesText(`${file.title}`);
    assert.dom('span.tiny.label').hasText(`${file.tags}`);
    assert.dom('span.light.text').hasText(`${file.extension}`);
    assert.dom('.tiny.rounded.image > img').isVisible();
  });
});
