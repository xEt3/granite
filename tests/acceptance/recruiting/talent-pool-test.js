import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import authenticate from 'granite/tests/helpers/auth';
import { visit, currentURL } from '@ember/test-helpers';

module('Acceptance | recruiting talent pool', function (hooks) {
  setupApplicationTest(hooks);

  test('list of applicants renders', async function (assert) {
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
    let campaign = await server.create('job-opening', {
      job,
      title: job.title
    });

    let applicant = await server.create('applicant');

    await visit(`/account/recruiting/job-opening/${campaign.id}/talent-pool`);
    assert.equal(currentURL(), `/account/recruiting/job-opening/${campaign.id}/talent-pool`);

    assert.dom('.segment .list .talent-pool__applicant .content').exists();
    assert.dom('.segment .list .talent-pool__applicant .header').hasText(`${applicant.firstName} ${applicant.lastName}`);
    assert.dom('.segment .list .talent-pool__applicant .meta').includesText('Last Applied');
    assert.dom('.segment .list .talent-pool__applicant .extra').includesText('Average Score: 62%');
    assert.dom('.segment .list .talent-pool__applicant .right.floated.content > a').includesText('Open Last Job Application');
  });
});
