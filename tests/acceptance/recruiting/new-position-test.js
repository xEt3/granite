import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import authenticate from 'granite/tests/helpers/auth';
import { visit, currentURL, click, settled } from '@ember/test-helpers';

module('Acceptance | recruiting-new postion', function (hooks) {
  setupApplicationTest(hooks);

  test('elements on new postion page', async function (assert) {
    await authenticate.call(this, server, {
      companyUser: {
        shownHints: [
          'recruiting-campaigns-index',
          'employees-index',
          'documents',
          'job-description-index',
          'job-description-new',
          'counseling-index'
        ]
      }
    });
    let job = await server.create('job');
    await server.create('job-opening', {
      job,
      title: job.title
    });

    await visit('/account/recruiting/campaigns');
    await new Promise(resolve => setTimeout(resolve, 500));
    await click('i#add-job-opening');
    await settled();
    assert.equal(currentURL(), '/account/recruiting/campaigns/new');
    assert.dom('h1.ui.header').hasText('New Position');
    assert.dom('h4 > a').hasText('Add a job description...');
    assert.dom('.job-description > label').hasText('Job Description');
    assert.dom('.campaign-name > label').hasText('Campaign Name');
    assert.dom('#job-description > input').isVisible();
    assert.dom('#job-description > input').doesNotIncludeText();
    assert.dom('input[name="name"]').isVisible();
    assert.dom('input[name="name"]').doesNotIncludeText();
    assert.dom('form > button').isDisabled();
    await click('#job-description > input');
    await settled();
    await click('#job-description div.menu > div.item.selected');
    await settled();
    assert.dom('form > button').isNotDisabled();
  });

  test('adding a new postion', async function (assert) {
    await authenticate.call(this, server, {
      companyUser: {
        shownHints: [
          'recruiting-campaigns-index',
          'employees-index',
          'documents',
          'job-description-index',
          'job-description-new',
          'counseling-index'
        ]
      }
    });
    let job = await server.create('job');

    await visit('/account/recruiting/campaigns/new');
    await click('#job-description > input');
    await settled();
    assert.dom('#job-description div.menu > div.item.selected').hasText(job.title);
    await click('#job-description div.menu > div.item.selected');
    await settled();
    assert.dom('#job-description > div.text').hasText(job.title);
    assert.dom('input[name="name"]').hasValue(`${job.title} Recruiting Campaign`);
    await click('form > button');
    assert.equal(currentURL(), `/account/recruiting/job-opening/${job.id}`);
  });
});
