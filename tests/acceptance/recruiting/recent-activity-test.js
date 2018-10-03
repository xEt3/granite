import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import authenticate from 'granite/tests/helpers/auth';
import { visit, currentURL, click, find, settled } from '@ember/test-helpers';

module('Acceptance | recruiting-recent activity', function (hooks) {
  setupApplicationTest(hooks);

  test('elements on recent activity page', async function (assert) {
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
    await server.create('job-openings', {
      job:   job.id,
      title: job.title
    });

    await visit(`/account/recruiting/job-opening/${job.id}`);
    assert.equal(currentURL(), `/account/recruiting/job-opening/${job.id}`);
    assert.equal(find('.account__breadcrumb').textContent.trim().replace(/\s\s+|\n/g, ''), 'Account/Recruiting/Job Opening/Campaign');
    assert.dom('div.raised > .header').hasText('Recent Activity');
    assert.dom('.chartjs-render-monitor').isVisible();
    assert.dom('div.menu__container-responsive div > a.text-blue').hasText('Continue Setup');
  });

  test('continue setup', async function (assert) {
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

    await visit(`/account/recruiting/job-opening/${job.id}`);
    assert.equal(currentURL(), `/account/recruiting/job-opening/${job.id}`);
    assert.dom('div.menu__container-responsive div > a.text-blue').hasText('Continue Setup');
    await click('div.menu__container-responsive div > a.text-blue');
    assert.equal(currentURL(), `/account/recruiting/job-opening/${job.id}/setup`);
    assert.dom('div:nth-child(1) > h1').hasText(`Setup ${campaign.name}`);
    assert.dom('div:nth-child(2) > h3').includesText('Setup');
    assert.dom('div:nth-child(2) > button').isVisible();
    assert.dom('.wizard__steps.steps a').exists({ count: 6 });
    await click('div:nth-child(2) > button');
    await settled();

    assert.equal(currentURL(), `/account/recruiting/job-opening/${job.id}/setup/settings`);
    assert.dom('div:nth-child(1) > h1').hasText(`Setup ${campaign.name}`);
    assert.dom('div > h2:nth-child(1)').hasText('Campaign Settings');
    assert.dom('label[for="send-notifications-to"]').isVisible();
    assert.dom('#send-notifications-to > input').isVisible();
    assert.dom('label[for="additional-emails-to-send-notifications"]').isVisible();
    assert.dom('#additional-emails-to-send-notifications > input').isVisible();
    assert.dom('label[for="start-date-optional-otherwise-immediate"]').isVisible();
    assert.dom('#start-date-optional-otherwise-immediate input').isVisible();
    assert.dom('label[for="end-date-optional-otherwise-until-filled"]').isVisible();
    assert.dom('#end-date-optional-otherwise-until-filled input').isVisible();
    assert.dom('label[for="due-on-optional"]').isVisible();
    assert.dom('#due-on-optional input').isVisible();
    assert.dom('label[for="positions-to-fill"]').isVisible();
    assert.dom('#positions-to-fill input').hasValue(`${campaign.positions}`);
    assert.dom('label[for="number-of-days-to-delay-outside-sources"]').isNotVisible();
    assert.dom('#number-of-days-to-delay-outside-sources input').isNotVisible();
    assert.dom('#show-internally > label').isVisible();
    await click('#show-internally > label');
    await settled();
    assert.dom('label[for="number-of-days-to-delay-outside-sources"]').isVisible();
    assert.dom('#number-of-days-to-delay-outside-sources input').isVisible();
    assert.dom('#send-confirmation-email-to-applicants label').isVisible();
    assert.dom('#send-job-close-notice-to-unrejected-applicants label').isVisible();
    assert.dom('#add-unrejected-applicants-to-talent-pool-after-filled label').isVisible();
    assert.dom('div > h2:nth-child(3)').hasText('Job Settings');
    assert.dom('label[for="location"]').isVisible();
    assert.dom('#location input').isVisible();
    assert.dom('label[for="job-type"]').isVisible();
    assert.dom('#job-type input').isVisible();
    assert.dom('#this-job-has-supervisory-duties label').isVisible();
    assert.dom('form > button').isNotDisabled();
    assert.dom('.wizard__steps > a.step:nth-child(2)').hasClass('active');
    await click('#send-notifications-to > input');
    await click('#send-notifications-to div.item.selected');
    assert.dom('#send-notifications-to > a.ui.label').isVisible();
    await click('#start-date-optional-otherwise-immediate input[type="text"]');
    await click('#start-date-optional-otherwise-immediate td:nth-child(1)');
    await click('#end-date-optional-otherwise-until-filled input[type="text"]');
    await click('#end-date-optional-otherwise-until-filled td.link.today.focus');
    await click('#job-type > input');
    await click('#job-type div.item.selected');
    assert.dom('#job-type > div.text').hasText('Full Time');
    await click('form > button');
    await settled();

    assert.equal(currentURL(), `/account/recruiting/job-opening/${job.id}/setup/screening`);
    assert.dom('div:nth-child(1) > h1').hasText(`Setup ${campaign.name}`);
    assert.dom('div > h2.header').hasText('Screening Form');
    assert.dom('div.right.icon > button.compact.green').isNotVisible();
    assert.dom('div.right.icon > button.compact.button').isVisible();
    assert.dom('div.right.icon > button.compact.button i.hide').isVisible();
    assert.dom('button.primary.button').isVisible();
    await click('div.right.icon > button.compact.button');
    assert.dom('button.primary.button').isNotVisible();
    assert.dom('div.right.icon > button.compact.button i.hide').isNotVisible();
    assert.dom('div.right.icon > button.compact.button i.unhide').isVisible();
    assert.dom('div.right.icon > button.compact.green.button').isVisible();
    assert.dom('button#toggle-applicant-scoring').hasText('Applicant Scoring Off');
    await click('button#toggle-applicant-scoring');
    assert.dom('button#toggle-applicant-scoring').hasText('Applicant Scoring On');
    await click('div form > button');

    assert.equal(currentURL(), `/account/recruiting/job-opening/${job.id}/setup/sources`);
    await settled();
    assert.dom('h2.horizontal.header + p').hasText('Edit the title and description of your job listing');
    assert.dom('.field label').hasText('Title');
    assert.dom('.field input').hasValue(job.title);
    assert.dom('div:nth-child(4) > label').hasText('Description (How your job description displays on the listing)');
    assert.dom('.ql-toolbar').exists();
    assert.dom('div.ql-editor > p').hasText(campaign.description);
    assert.dom('.ui.header').exists({ count: 4 });
    await click('button.green');

    assert.equal(currentURL(), `/account/recruiting/job-opening/${job.id}/setup/eeo`);
    await click('button.green');

    assert.equal(currentURL(), `/account/recruiting/job-opening/${job.id}/setup/finish`);
    assert.dom('form > h2').hasText('Review');
    assert.dom('form > h3').includesText(job.title);
    assert.dom('button.green').hasText('Launch Campaign');
    await click('button.green');
    assert.equal(currentURL(), `/account/recruiting/job-opening/${job.id}`);
  });
});
