import { module, test } from 'qunit';
import { faker } from 'ember-cli-mirage';
import { setupApplicationTest } from 'ember-qunit';
import authenticate from 'granite/tests/helpers/auth';
import { visit, currentURL, click, find, findAll, settled, pauseTest, fillIn } from '@ember/test-helpers';

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



  });
});
