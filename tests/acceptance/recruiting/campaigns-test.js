import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import authenticate from 'granite/tests/helpers/auth';
import faker from 'faker';
import { visit, currentURL, find } from '@ember/test-helpers';

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

    let campaign = await server.create('job-opening', {
      job,
      completedSetup: faker.date.past
    });

    await visit('/account/recruiting/campaigns');
    assert.equal(find('.account__breadcrumb').textContent.trim().replace(/\s\s+|\n/g, ''), 'Account/Recruiting');
    assert.dom('hgroup > h1').hasText('Recruiting Campaigns');
    assert.dom('.content > div.header').hasText(campaign.name);
    assert.dom('div > div.meta').includesText(`Hiring for ${job.title}`);
    assert.dom('div.extra > span.green').hasText('Hiring');
    assert.dom('span.blue > span').includesText('ago');
    assert.dom('i.plus.icon').isVisible();
    assert.dom('div.pagination > a').exists({ count: 4 });
    assert.dom('div.ui.container > div.pointing > a').exists({ count: 2 });
  });
});
