import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import authenticate from 'granite/tests/helpers/auth';
import { visit, currentURL, settled, click, fillIn } from '@ember/test-helpers';

module('Acceptance | job-description-edit', function (hooks) {
  setupApplicationTest(hooks);

  test('getting to edit job-description page', async function (assert) {
    await authenticate.call(this, server);
    let job = await server.create('job');

    await visit(`/account/recruiting/job/${job.id}`);
    await settled();
    assert.equal(currentURL(), `/account/recruiting/job/${job.id}`);
    await click('.item.icon.top.right.pointing');
    await settled();

    let edit = `div.ui.dropdown > div.menu a[href="/account/recruiting/job/${job.id}/edit"]`;
    await click(edit);
    await settled();
    assert.equal(currentURL(), `/account/recruiting/job/${job.id}/edit`);
  });

  test('all elements on edit job-description page', async function (assert) {
    await authenticate.call(this, server);
    let job = await server.create('job');

    await visit(`/account/recruiting/job/${job.id}/edit`);
    await settled();
    assert.equal(currentURL(), `/account/recruiting/job/${job.id}/edit`);
    assert.dom('h1').hasText('Edit Job Description');
    assert.dom('#job-title  > .field > input').exists();
    assert.dom('#job-title  > .field > input').hasValue(`${job.title}`);
    assert.dom('.field.job-description').includesText('Job Description');
    assert.dom('.field.category').exists();
    assert.dom('.field.department').exists();
    assert.dom('.field.equipment').exists();
  });

  test('edit job-description', async function (assert) {
    await authenticate.call(this, server);
    let job = await server.create('job'),
        initialJobDescription = job.description,
        initialJobTitle = job.title;

    await visit(`/account/recruiting/job/${job.id}/edit`);
    await settled();
    assert.equal(currentURL(), `/account/recruiting/job/${job.id}/edit`);
    assert.dom('#job-title  > .field > input').hasValue(`${job.title}`);
    assert.dom('.field.job-description').includesText('Job Description');
    await fillIn('#job-title > .field > input', 'Test Title');
    await fillIn('div.ql-editor > p', 'New Description');
    await click('button[type="submit"]');

    assert.equal(currentURL(), `/account/recruiting/job/${job.id}`);
    assert.dom('h2.header').doesNotIncludeText(`${initialJobTitle}`);
    assert.dom('h2.header').hasText('Test Title');
    assert.dom('.ui.raised.animated > p').doesNotIncludeText(`${initialJobDescription}`);
    assert.dom('.ui.raised.animated > p').hasText('New Description');
  });
});
