import { module, test } from 'qunit';
import { faker } from 'ember-cli-mirage';
import { setupApplicationTest } from 'ember-qunit';
import authenticate from 'granite/tests/helpers/auth';
import { visit, currentURL, click, settled } from '@ember/test-helpers';

module('Acceptance | recruiting-applicant-tracking', function (hooks) {
  setupApplicationTest(hooks);


  test('elements on applicant-tracking page', async function (assert) {
    let { company } = await authenticate.call(this, server, {
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
    let applicant = await server.create('applicants');
    await server.create('recruiting-pipelines', {
      company: company.id,
      stages:  [
        {
          order:   0,
          name:    'Phone Screen',
          created: faker.date.past
        },
        {
          order:   1,
          name:    'Interview',
          created: faker.date.past
        },
        {
          order:   2,
          name:    'Offer',
          created: faker.date.past
        }
      ],
      created: faker.date.past
    });

    let job = await server.create('job');
    let campaign = await server.create('job-openings', {
      job:   job.id,
      title: job.title
    });
    await server.create('job-applications', {
      jobOpening: campaign.id,
      applicant:  applicant.id
    });

    await visit(`/account/recruiting/job-opening/${job.id}`);
    await click('div.menu__container-responsive  div > a:nth-child(2)');
    assert.equal(currentURL(), `/account/recruiting/job-opening/${job.id}/applicant-tracking`);
    assert.dom('.ui.padded.fadeInUp').includesText('Your Recruiting Pipeline');
    assert.dom('h2 > div > div:nth-child(1) > a').hasText('Add Applicant');
    assert.dom('.plus.icon');
    assert.dom('small > a').hasText('Show Disqualified Applicants');
    await click('small > a');
    assert.dom('small > a').hasText('Hide Disqualified Applicants');
    assert.dom('.pipeline .pipeline__stage').exists({ count: 3 });
    assert.dom('.content.content__flex > .header').hasText(applicant.name.first + ' ' + applicant.name.last);
    assert.dom('.ui.small.green.button').isNotVisible();
    assert.dom('.ui.small.orange.button').isNotVisible();
    await click('div.divided.items div.field input');
    assert.dom('.ui.small.green.button').isVisible();
    assert.dom('.ui.small.orange.button').isVisible();
  });

  test('moving applicant in applicant-tracking', async function (assert) {
    let { company } = await authenticate.call(this, server, {
      company: { correctiveActionSeverities: [] },

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
    let applicant = await server.create('applicants');
    let pipeline = await server.create('recruiting-pipelines', {
      company: company.id,
      stages:  [
        {
          _id:     '1',
          order:   0,
          name:    'Phone Screen',
          created: faker.date.past
        },
        {
          _id:     '2',
          order:   1,
          name:    'Interview',
          created: faker.date.past
        },
        {
          _id:     '3',
          order:   2,
          name:    'Offer',
          created: faker.date.past
        }
      ],
      created: faker.date.past
    });

    let job = await server.create('job');
    let campaign = await server.create('job-openings', {
      job:   job.id,
      title: job.title
    });
    await server.create('job-applications', {
      jobOpening: campaign.id,
      applicant:  applicant.id,
      stage:      pipeline.stages[0]._id
    });

    await visit(`/account/recruiting/job-opening/${job.id}/applicant-tracking`);
    assert.dom('div.pipeline__stage:nth-child(1) > ul.pipeline-stage__cards').isVisible();
    assert.dom('div.pipeline__stage:nth-child(2) > ul.pipeline-stage__cards').isNotVisible();
    assert.dom('div.pipeline__stage:nth-child(3) > ul.pipeline-stage__cards').isNotVisible();
    assert.dom('span.card-content__applicant-name').hasText(applicant.name.first + ' ' + applicant.name.last);
    assert.dom('.card-content__email > a').hasText(applicant.email);
    assert.dom('.card-content__next-schedule').hasText('Nothing scheduled');
    assert.dom('.card-content__application-link > a').hasText('Open Application');
    assert.dom('span.card-content__entry-method').includesText('Entry');
    assert.dom('.exchange.icon').isVisible();
    assert.dom('.setting.icon').isVisible();
    await click('.exchange.icon');
    assert.dom('.card-title-bar__controls span .menu a.item').exists({ count: 2 });
    await settled();
    await new Promise(resolve => setTimeout(resolve, 500));
    await click('.title-bar__control .menu > .item:nth-child(2)');

    assert.dom('div.pipeline__stage:nth-child(1) > ul.pipeline-stage__cards').isNotVisible();
    assert.dom('div.pipeline__stage:nth-child(2) > ul.pipeline-stage__cards').isVisible();
    assert.dom('div.pipeline__stage:nth-child(3) > ul.pipeline-stage__cards').isNotVisible();
    await click('.exchange.icon');
    await new Promise(resolve => setTimeout(resolve, 500));
    await click('.title-bar__control .menu > .item:nth-child(3)');

    assert.dom('div.pipeline__stage:nth-child(1) > ul.pipeline-stage__cards').isNotVisible();
    assert.dom('div.pipeline__stage:nth-child(2) > ul.pipeline-stage__cards').isNotVisible();
    assert.dom('div.pipeline__stage:nth-child(3) > ul.pipeline-stage__cards').isVisible();
    await click('.title-bar__control i.setting.icon');
    await new Promise(resolve => setTimeout(resolve, 500));
    assert.dom('div.title-bar__control > .setting + .menu > .item').exists({ count: 3 });
  });
});
