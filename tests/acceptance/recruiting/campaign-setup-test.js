import { module, test } from 'qunit';
import moment from 'moment';
import { setupApplicationTest } from 'ember-qunit';
import authenticate from 'granite/tests/helpers/auth';
import { visit, click, currentURL, fillIn, findAll, find } from '@ember/test-helpers';

module('Acceptance | campaign setup test', function (hooks) {
  setupApplicationTest(hooks);

  test('Can navigate to setup and get past start tab', async function (assert) {
    let { company } = await authenticate.call(this, server),
        job = server.create('job', { company }),
        campaign = await server.create('job-opening', {
          company,
          job,
          title: job.title
        });

    await visit(`/account/recruiting/job-opening/${campaign.id}`);
    assert.dom(`a[href="/account/recruiting/job-opening/${campaign.id}/setup"]`).exists('Campaign has setup option available');
    await click(`a[href="/account/recruiting/job-opening/${campaign.id}/setup"]`);
    assert.equal(currentURL(), `/account/recruiting/job-opening/${campaign.id}/setup`, 'successfully navigated to campaign setup main tab');
    assert.dom('button.ui.huge.positive.fluid.button').hasText('Let\'s get started');
    await click('button.ui.huge.positive.fluid.button');
    assert.equal(currentURL(), `/account/recruiting/job-opening/${campaign.id}/setup/settings`, 'start button took us to the settings tab');
  });

  test('Settings tab works as intended', async function (assert) {
    let { company, companyUser } = await authenticate.call(this, server),
        job = server.create('job', { company }),
        location = server.create('location'),
        campaign = await server.create('job-opening', {
          job,
          company,
          title: job.title
        });

    await visit(`/account/recruiting/job-opening/${campaign.id}/setup/settings`);

    //send notifications internally list
    await click('div#send-notifications-to');
    assert.dom('div#send-notifications-to div.menu div.item:nth-child(1)').hasText(companyUser.fullName, 'companyUser is in the list to be added to send notifications list');
    await click('div#send-notifications-to div.menu div.item:nth-child(1)');
    assert.dom('div#send-notifications-to > a.ui.label').hasText(companyUser.fullName, 'company user added to send notifications list');
    //set a start date
    await click('div.start-date-optional-otherwise-immediate > div.calendar > div.ui.input > input');
    await fillIn('div.start-date-optional-otherwise-immediate > div.calendar > div.ui.input > input', '1/1/2020');
    //set an end date
    await click('div.end-date-optional-otherwise-until-filled > div.calendar > div.ui.input > input');
    await fillIn('div.end-date-optional-otherwise-until-filled > div.calendar > div.ui.input > input', '12/31/2020');
    //set due on
    await click('div.due-on-optional > div.calendar > div.ui.input > input');
    await fillIn('div.due-on-optional > div.calendar > div.ui.input > input', '12/30/2020');
    //show internally
    await click('div#show-internally');
    assert.dom('div#number-of-days-to-delay-outside-sources').isVisible('should be able to enter number of days internal now');
    await fillIn('div#number-of-days-to-delay-outside-sources > input', 8);
    // position number
    await fillIn('input[name="positions"]', 6);
    //send job-close notif
    await click('div#send-job-close-notice-to-unrejected-applicants');
    //add rejected to talent pool
    await click('div#add-unrejected-applicants-to-talent-pool-after-filled');
    //set location
    await click('div#location > input');
    assert.dom('div#location > div.menu > div.item').hasText(location.name, 'Location name is displayed correctly');
    await click('div#location > div.menu > div.item:nth-child(1)');
    //set job type
    await click('div#job-type > input');
    assert.dom('div#job-type> div.menu > div.item').hasText('Full Time', 'job type is displayed correctly');
    await click('div#job-type > div.menu > div.item:nth-child(1)');
    //job has supervisor duties
    await click('div#this-job-has-supervisory-duties');

    //save and go to next tab
    assert.dom('button.ui.huge.fluid.green.button[type="submit"]').hasText('Next', 'Submit button says next');
    await click('button.ui.huge.fluid.green.button[type="submit"]');
    assert.equal(currentURL(), `/account/recruiting/job-opening/${campaign.id}/setup/screening`, 'Next button navigated succesfully to screening tab');

    let savedCampaign = server.db.jobOpenings.find(campaign.id);

    assert.equal(1, savedCampaign.subscribers.length, 'should be one saved internal email subscriber');
    assert.equal(moment(savedCampaign.startOn).format('MM/DD/YYYY'), '01/01/2020', 'start date should be 1/1/2020');
    assert.equal(moment(savedCampaign.endOn).format('MM/DD/YYYY'), '12/31/2020', 'end date should be 12/31/2020');
    assert.equal(moment(savedCampaign.dueOn).format('MM/DD/YYYY'), '12/30/2020', 'end date should be 12/30/2020');
    assert.ok(savedCampaign.availableInternally, 'job opening is available internally');
    assert.equal(savedCampaign.internalDuration, 8, 'internal duration is 8');
    assert.equal(savedCampaign.positions, 6, 'should be 6 positions open for this job opening');
    assert.ok(savedCampaign.sendCloseNotice, 'should send close notice');
    assert.ok(savedCampaign.allocateTalentPool, 'should add to talent pool');
    assert.equal(savedCampaign.locationId, location.id, 'location is correct');
    assert.equal(savedCampaign.jobType, 'Full Time', 'job type is correct');
    assert.ok(savedCampaign.supervisoryRequirements, 'job has supervisory requirements');
  });

  test('screening tab works as intended', async function (assert) {
    let { company } = await authenticate.call(this, server),
        job = server.create('job', { company }),
        campaign = await server.create('job-opening', {
          job,
          company,
          title: job.title
        });

    await visit(`/account/recruiting/job-opening/${campaign.id}/setup/screening`);
    assert.equal(currentURL(), `/account/recruiting/job-opening/${campaign.id}/setup/screening`, 'on the correct page for tests to start');

    //add a question
    await click('button.ui.primary.fluid.button');
    await fillIn('div.content > div.two.fields > div.field > input[type="text"]', 'This is your first question');
    await click('div.content > div.two.fields > div.field:nth-child(2) > div.selection.ui.dropdown');
    await click('div.content > div.two.fields > div.field:nth-child(2) > div.selection.ui.dropdown > div.menu > div.item:nth-child(1)');
    await click('div.content > div.field > div.ui.checkbox > input[type="checkbox"]');
    assert.dom('div.content > div.form-element__preview > div.field > textarea').isVisible('free form text box became visible');
    assert.dom('div.content > div.form-element__preview > div.field > label').hasText('1) This is your first question');

    //add a second question
    await click('button.ui.primary.fluid.button');
    await fillIn('li.sortable-item:nth-child(2) > div.content > div.two.fields > div.field > input[type="text"]', 'This is your second question');
    await click('li.sortable-item:nth-child(2) > div.content > div.two.fields > div.field:nth-child(2) > div.selection.ui.dropdown');
    await click('li.sortable-item:nth-child(2) > div.content > div.two.fields > div.field:nth-child(2) > div.selection.ui.dropdown > div.menu > div.item:nth-child(4)');
    assert.dom('li.sortable-item:nth-child(2) > div.content > div.form-element__preview > div.field > div.checkbox').isVisible('checkbox is visible for preview on second question');
    assert.dom('li.sortable-item:nth-child(2) > div.content > div.form-element__preview > div.field > label').hasText('2) This is your second question');

    //add a third question and delete it
    await click('button.ui.primary.fluid.button');
    assert.dom('li.sortable-item:nth-child(3) > div.content > div.form-element__controls > a.text-danger > i.trash.icon').exists('third question is created, and trash can is there');
    await click('li.sortable-item:nth-child(3) > div.content > div.form-element__controls > a.text-danger');
    assert.dom('li.sortable-item:nth-child(3)').doesNotExist('third question was deleted from dom correctly');

    // toggle preview mode
    assert.dom('div.field.right.aligned.icon > button.ui.compact.button:nth-child(1)').hasText('Preview');
    await click('div.field.right.aligned.icon > button.ui.compact.button:nth-child(1)');
    assert.dom('div.field.right.aligned.icon > button.ui.compact.button:nth-child(1)').hasText('Hide Preview');
    assert.dom('div.content > div.two.fields').isNotVisible();
    assert.dom('button.ui.primary.fluid.button').isNotVisible('add a question button toggles away on preview');

    await click('button.ui.huge.fluid.green.button');
    assert.equal(currentURL(), `/account/recruiting/job-opening/${campaign.id}/setup/sources`, 'next button took us to sources tab correctly');

    let savedCampaign = server.db.jobOpenings.find(campaign.id);
    let form = server.db.forms.find(savedCampaign.screening);

    assert.ok(form, 'campaign has saved form on it');
    assert.equal(form.elementIds.length, 2, 'job opening has 2 elements on its form');

    form.elementIds.forEach(id => {
      let element = server.db.formElements.find(id);
      assert.equal(element.type, id === '1' ? 'textarea' : 'checkbox', 'element type saved correctly');
      assert.equal(element.label, id === '1' ? 'This is your first question' : 'This is your second question', 'element label saved correctly');
    });
  });

  test('sources tab works as intended', async function (assert) {
    let { company } = await authenticate.call(this, server),
        job = server.create('job', { company }),
        campaign = await server.create('job-opening', {
          job,
          company,
          title: job.title
        }),
        manualApplicantSource = await server.create('manual-applicant-source'),
        applicantSource = await server.create('applicant-source');

    await visit(`/account/recruiting/job-opening/${campaign.id}/setup/sources`);

    assert.dom('input[placeholder="What shows as the job name on the listing?"]').hasValue(campaign.title, 'Correct campaign title is displayed on default');
    assert.dom('div.ql-editor').hasText(campaign.description, 'campaign description is displayed in text editor by default');
    assert.dom('div.applicant-source__list-item.item div.checkbox > label').hasText(manualApplicantSource.name, 'manual applicant source is displayed');
    assert.dom(await findAll('div.applicant-source__list-item.item div.checkbox > label')[1]).hasText(applicantSource.name, 'applicant source is displayed');

    await click('div.applicant-source__list-item.item div.checkbox');
    await click(await findAll('div.applicant-source__list-item.item div.checkbox')[1]);
    await click('button.ui.huge.fluid.green.button');

    assert.equal(currentURL(), `/account/recruiting/job-opening/${campaign.id}/setup/eeo`, 'next button transitioned correctly');

    const savedCampaign = server.db.jobOpenings.find(campaign.id);

    assert.equal(savedCampaign.applicantSources[0], applicantSource.id);
    assert.equal(savedCampaign.manualApplicantSources[0], manualApplicantSource.id);
  });

  test('eeo tab works as intended', async function (assert) {
    let { company } = await authenticate.call(this, server),
        job = server.create('job', { company }),
        campaign = await server.create('job-opening', {
          job,
          company,
          title: job.title
        });

    await visit(`/account/recruiting/job-opening/${campaign.id}/setup/eeo`);

    await click('div#eeo-job-category > input');
    await click('div#eeo-job-category > div.menu > div.item:nth-child(1)');

    const eeoCat = await find('div#eeo-job-category > div.menu > div.item:nth-child(1)').innerText;

    await click('button.ui.huge.fluid.green.button');

    assert.equal(currentURL(), `/account/recruiting/job-opening/${campaign.id}/setup/finish`);

    const savedCampaign = server.db.jobOpenings.find(campaign.id);

    assert.equal(savedCampaign.eeoCategory, eeoCat, 'job opening eeo category saved correctly');
  });

  test('finish setup and campaign launch work as intended', async function (assert) {
    let { company } = await authenticate.call(this, server),
        job = server.create('job', { company }),
        campaign = await server.create('job-opening', {
          job,
          company,
          title: job.title
        });

    await visit(`/account/recruiting/job-opening/${campaign.id}/setup/finish`);
    await click('button.ui.huge.fluid.green.button');

    assert.equal(currentURL(), `/account/recruiting/job-opening/${campaign.id}`, 'launching campaign took us to the campaign home page');

    const savedCampaign = server.db.jobOpenings.find(campaign.id);

    assert.notOk(savedCampaign.setup, 'campaign no longer needs setup');
    assert.notOk(savedCampaign.setupStep, 'campaign no longer has setup step');
    assert.notOk(savedCampaign.setupProgress, 'campaign no longer has setup progress');
  });
});

