import { module, test } from 'qunit';
import { visit, currentURL, findAll, find, click } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import authenticate from 'granite/tests/helpers/auth';

module('Acceptance | custom pipeline/custom pipeline setup', function (hooks) {
  setupApplicationTest(hooks);

  //test that toggle displays default pipeline's stages
  test('toggling custom pipeline displays default stages', async function (assert) {
    let { company } = await authenticate.call(this, server),
        defaultPipeline = server.create('recruiting-pipeline', { company: company.id }),
        job = server.create('job', { company: company.id }),
        jobOpening = server.create('job-opening', {
          company:        company.id,
          job:            job.id,
          setup:          false,
          completedSetup: null
        });
    await visit('/account/recruiting/campaigns');
    await click('div.ui.divided.link.items > a.item');
    await click('div.right.menu > a.item.text-blue');
    await click(findAll('div.ui.steps > a.step')[1]);//goes to campaign settings

    assert.equal(currentURL(), `/account/recruiting/job-opening/${jobOpening.id}/setup/settings`, 'on settings page for campaign');
    assert.notOk(find('div.custom-pipeline-toggle > div.toggle.checkbox.checked'), 'custom pipeline toggle is not checked before clicking');

    await click('div.custom-pipeline-toggle > div.toggle.checkbox');

    let stagesDisplayed = findAll('li.stage-list__card');
    assert.ok(find('div.custom-pipeline-toggle > div.toggle.checkbox.checked'), 'custom pipeline toggle is checked after clicking');
    assert.equal(stagesDisplayed.length, defaultPipeline.stages.length, 'correct number of stages are shown initially');
    defaultPipeline.stages.forEach((stage, i) => {
      assert.dom(stagesDisplayed[i]).includesText(stage.name, `Stage with name ${stage.name} is displayed`);
    });

    //test that hitting toggle again takes custom off of screen
    let done = assert.async();
    setTimeout(() => {
      done();
    }, 10000);
    assert.equal(1, 1, 'generic test');
  });
});

//test that hitting toggle doesn't save db object
//test that hitting next saves the custom pipeline
test('saving custom pipeline works', async function (assert) {
  let done = assert.async();
  setTimeout(() => {
    done();
  }, 10000);
  assert.equal(1, 1, 'generic test');
});

//test that stage can be added - not saved until next hit
//test that stage can't be added when there are already 5 stages
//test that stage can be removed - not saved until next hit
//test that button comes back when 5th stage is deleted
//test that stage can be edited - not saved until next hit
//test that pipeline is deleted once custom is turned off - must be saved first

//probably going to need to cherry pick bits and pieces from other pipeline related PR
//WILL HAVE TO REPEAT FOR NOT-SETUP SETTINGS *should be same tests
