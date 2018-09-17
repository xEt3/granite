import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import authenticate from 'granite/tests/helpers/auth';
import { visit, currentURL, click, find, findAll, settled, pauseTest } from '@ember/test-helpers';

module('Acceptance | recruiting', function (hooks) {
  setupApplicationTest(hooks);

  test('getting to the recruiting page', async function (assert) {
    await authenticate.call(this, server);
    await visit('/account/recruiting/campaigns');
    assert.equal(currentURL(), '/account/recruiting/campaigns', 'on recruiting page');
  });

  test('elements on recruiting page', async function (assert) {
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

    let campaign = await server.create('job-openings', { job: job.id });
    await visit('/account/recruiting/campaigns');
    assert.equal(find('.account__breadcrumb').textContent.trim().replace(/\s\s+|\n/g, ''), 'Account/Recruiting');
    assert.dom('hgroup > h1').hasText('Recruiting Campaigns');
    assert.dom('a > div > div.header').hasText(campaign.name);
    assert.dom('div > div.meta').includesText(`Hiring for ${campaign.job.title}`);
    assert.dom('div.extra > span.ui.green.label').hasText('Hiring');
    assert.dom('span.ui.blue.label > span').includesText('months ago');
    assert.dom('i.plus.icon').isVisible();
    assert.dom('div.ui.right.floated.pagination.menu > a').exists({ count: 4 });
    assert.dom('div.ui.container > div.ui.pointing.menu > a').exists({ count: 2 });
  });
});
