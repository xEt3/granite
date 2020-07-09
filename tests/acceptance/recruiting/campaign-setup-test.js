import { module, test } from 'qunit';
import faker from 'faker';
import { setupApplicationTest } from 'ember-qunit';
import authenticate from 'granite/tests/helpers/auth';
import { visit, currentURL, click, settled, findAll } from '@ember/test-helpers';
// import {find} from '../../../node_modules/parchment/dist/src/registry';

module('Acceptance | campaign setup test', function (hooks) {
  setupApplicationTest(hooks);


  test('Set up a full campaign', async function (assert) {
    let { company } = await authenticate.call(this, server);

    let job = server.create('job',{ company});

    let campaign = await server.create('job-opening', {
      company,
      job,
      title: job.title
    });

    await visit(`/account/recruiting/job-opening/${campaign.id}`);
    // assert.dom('div.pipeline-card__content > div.ui.bottom.attached.red.label').isVisible();

    await click(`a[href="/account/recruiting/job-opening/${campaign.id}/setup"]`);
  

    await visit(`/account/recruiting/job-opening/${campaign.id}/setup/screening`);

   await click('.primary.fluid.button')
   console.log('campaign', campaign)

  // await click('.selection.ui.dropdown')
  // await click('div[data-value="textarea"]')
  // await click('.primary.fluid.button')
  // let dropdown = await findAll('.selection.ui.dropdown')
  // await click('li:nth-child(2) > .content .selection')
  // await click('li:nth-child(2) > .content .selection div[data-value="textarea"]')
    // await this.pauseTest()

  await click('.green.button')

  await this.pauseTest()


    // await click('div.card-title-bar__controls > div.title-bar__control:nth-child(2) > i.setting.icon');
    // await click('div.card-title-bar__controls > div.title-bar__control:nth-child(2) > div.menu > a:nth-child(3)');
    // await click('div#dq-reason > div.menu > .item:nth-child(5)');
    // await click('div#modal__ats-disqualify div.actions > button.ui.green.button');

    // let applicationAfterDQ = server.db.jobApplications.find(application.id);
    // assert.equal(applicationAfterDQ.disqualified, true, 'app is now disqualified');
    // assert.equal(applicationAfterDQ.disqualificationReason, 'Failed test', 'dq reason was set accurately');

    // assert.dom('div.pipeline-card__content > div.ui.bottom.attached.red.label').isVisible();
    // assert.dom('div.pipeline-card__content > div.ui.bottom.attached.red.label').includesText('Failed test', 'button red label includes dq reason');

    // await click(`a[href="/account/recruiting/job-opening/${campaign.id}/setup"]`);

    // assert.dom('div.container > div.padded.segment > div.top.label').isVisible();
    // assert.dom('div.container > div.padded.segment > div.top.label').hasClass('red');
    assert.dom('div.container > div.padded.segment > div.top.label').includesText('Failed test');
  });
});
