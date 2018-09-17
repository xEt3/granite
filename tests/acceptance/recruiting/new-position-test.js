import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import authenticate from 'granite/tests/helpers/auth';
import { visit, currentURL, click, find, findAll, settled, pauseTest } from '@ember/test-helpers';

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
    let campaign = await server.create('job-openings', {
      job:   job.id,
      title: job.title
    });
    await visit('/account/recruiting/campaigns');
    await new Promise(resolve => setTimeout(resolve, 500));
    await click('i#add-job-opening');
    await settled();
    assert.equal(currentURL(), '/account/recruiting/campaigns/new');
    assert.dom('h1.ui.header').hasText('New Position');
    assert.dom('h4 > a').hasText('Add a job description...');
    assert.dom('div.field.job-description > label').hasText('Job Description');
    assert.dom('div.field.campaign-name > label').hasText('Campaign Name');
    assert.dom('div#job-description > input').isVisible();
    assert.dom('div#job-description > input').doesNotIncludeText();
    assert.dom('input[name="name"]').isVisible();
    assert.dom('input[name="name"]').doesNotIncludeText();
    assert.dom('form > button').isDisabled();
    await click('div#job-description > input');
    await settled();
    await click('div#job-description div.menu.transition > div.item.selected');
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
    await click('div#job-description > input');
    await settled();
    assert.dom('div#job-description div.menu.transition > div.item.selected').hasText(job.title);
    await click('div#job-description div.menu.transition > div.item.selected');
    await settled();
    assert.dom('div#job-description > div.text').hasText(job.title);
    assert.dom('input[name="name"]').hasValue(`${job.title} Recruiting Campaign`);
    await click('form > button');
    assert.equal(currentURL(), `/account/recruiting/job-opening/${job.id}`);
  });
});
