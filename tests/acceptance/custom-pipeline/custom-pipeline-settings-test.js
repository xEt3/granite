import { module, test } from 'qunit';
import { visit, currentURL, findAll, find, click, fillIn } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import authenticate from 'granite/tests/helpers/auth';

module('Acceptance | custom pipeline settings', function (hooks) {
  setupApplicationTest(hooks);

  test('toggling custom pipeline displays default stages/ removes stages', async function (assert) {
    let { company } = await authenticate.call(this, server),
        defaultPipeline = server.create('recruiting-pipeline', { company: company.id }),
        job = server.create('job', { company: company.id }),
        jobOpening = server.create('job-opening', {
          company,
          job
        });

    await visit(`/account/recruiting/job-opening/${jobOpening.id}/settings`);

    assert.equal(currentURL(), `/account/recruiting/job-opening/${jobOpening.id}/settings`, 'on settings page for campaign');
    assert.notOk(find('div.custom-pipeline-toggle > div.toggle.checkbox.checked'), 'custom pipeline toggle is not checked before clicking');

    await click('div.custom-pipeline-toggle > div.toggle.checkbox');

    let stagesDisplayed = findAll('li.stage-list__card');
    assert.ok(find('div.custom-pipeline-toggle > div.toggle.checkbox.checked'), 'custom pipeline toggle is checked after clicking');
    assert.equal(stagesDisplayed.length, defaultPipeline.stages.length, 'correct number of stages are shown initially');
    defaultPipeline.stages.forEach((stage, i) => {
      assert.dom(stagesDisplayed[i]).includesText(stage.name, `Stage with name ${stage.name} is displayed`);
    });

    await click('div.custom-pipeline-toggle > div.toggle.checkbox');

    assert.notOk(find('div.custom-pipeline-toggle > div.toggle.checkbox.checked'), 'custom pipeline toggle is not checked anymore');
    assert.equal(findAll('li.stage-list__card').length, 0, 'no stages displayed any more');
  });

  test('saving custom pipeline works', async function (assert) {
    let { company } = await authenticate.call(this, server),
        defaultPipeline = server.create('recruiting-pipeline', { company: company.id }),
        job = server.create('job', { company: company.id }),
        jobOpening = server.create('job-opening', {
          company,
          job
        });

    await visit(`/account/recruiting/job-opening/${jobOpening.id}/settings`);

    assert.equal(currentURL(), `/account/recruiting/job-opening/${jobOpening.id}/settings`, 'on settings page for campaign');

    await click('div.custom-pipeline-toggle > div.toggle.checkbox');

    let stagesDisplayed = findAll('li.stage-list__card');
    assert.equal(stagesDisplayed.length, defaultPipeline.stages.length, 'custom pipeline is displayed');
    assert.equal(server.db.recruitingPipelines.length, 1, 'still only the default pipeline in db');

    await click('button[type="submit"]');

    assert.equal(currentURL(), `/account/recruiting/job-opening/${jobOpening.id}`, 'transitioned back to main page');
    assert.equal(server.db.recruitingPipelines.length, 2, 'custom pipeline was saved in db');

    let customPipeline = server.db.recruitingPipelines.findBy((pipeline) => pipeline.jobOpenings.includes(jobOpening.id));

    await click(findAll('div.ui.pointing.menu > a')[1]);

    customPipeline.stages.forEach((stage, i) => {
      assert.dom(findAll('h2.pipeline-stage__title')[i]).includesText(stage.name, `Custom pipeline stage ${stage.name} is displayed in ats`);
      assert.equal(stage.name, defaultPipeline.stages[i].name, `custom pipeline saved stage ${stage.name} correctly`);
    });
    assert.equal(customPipeline.jobOpenings[0], jobOpening.id, 'custom pipeline saved jobOpening to jobOpenings array correctly');
  });

  test('custom pipeline stage can be added and saved', async function (assert) {
    let { company } = await authenticate.call(this, server),
        defaultPipeline = server.create('recruiting-pipeline', {
          company: company.id,
          stages:  [{
            name:  'Stage 1',
            order: 0
          }, {
            name:  'Stage 2',
            order: 1
          }, {
            name:  'Stage 3',
            order: 2
          }, {
            name:  'Stage 4',
            order: 3
          }]
        }),
        job = server.create('job', { company: company.id }),
        jobOpening = server.create('job-opening', {
          company,
          job,
          setup:          false,
          completedSetup: null
        }),
        newStageName = 'Stage 5';

    await visit(`/account/recruiting/job-opening/${jobOpening.id}/settings`);
    await click('div.custom-pipeline-toggle > div.toggle.checkbox');

    let stagesDisplayed = findAll('li.stage-list__card');
    assert.equal(stagesDisplayed.length, 4, '4 stages showing correctly');
    assert.dom('button#add-stage').isVisible('add stage button is visible');

    await click('button#add-stage');
    await fillIn('#modal__add-stage input[name="name"]', newStageName);
    await click('.confirm-add-stage');

    assert.equal(server.db.recruitingPipelines.length, 1, 'custom pipeline has not been saved yet');

    let stagesDisplayedAfterAdd = findAll('li.stage-list__card');
    assert.equal(stagesDisplayedAfterAdd.length, 5, 'five stages now shown  after add');
    assert.dom(stagesDisplayedAfterAdd[stagesDisplayedAfterAdd.length - 1]).includesText(newStageName, 'new stage was added to the bottom of the stage list');
    assert.dom('button#add-stage').isNotVisible('add stage button is not visible when 5 stages are already added');

    await click('button[type="submit"]');

    let customPipeline = server.db.recruitingPipelines.findBy((pipeline) => pipeline.jobOpenings.includes(jobOpening.id));
    assert.ok(customPipeline, 'custom pipeline was created and saved');
    assert.equal(customPipeline.stages.length, 5, 'custom pipeline has 5 stages');
    assert.equal(customPipeline.stages[4].name, newStageName, 'stage name saved correctly');

    let defaultPipelineFromDb = server.db.recruitingPipelines.find(defaultPipeline.id);

    defaultPipelineFromDb.stages.forEach((stage, i) => {
      assert.equal(stage.name, defaultPipeline.stages[i].name, `default pipeline stage ${defaultPipeline.stages[i].name} was not altered`);
    });
  });

  test('removing and saving a stage works', async function (assert) {
    let { company } = await authenticate.call(this, server),
        job = server.create('job', { company: company.id }),
        jobOpening = server.create('job-opening', {
          company,
          job
        });

    server.create('recruiting-pipeline', {
      company: company.id,
      stages:  [{
        name:  'Stage 1',
        order: 0
      }, {
        name:  'Stage 2',
        order: 1
      }, {
        name:  'Stage 3',
        order: 2
      }, {
        name:  'Stage 4',
        order: 3
      }, {
        name:  'Stage 5',
        order: 4
      }]
    });

    await visit(`/account/recruiting/job-opening/${jobOpening.id}/settings`);
    await click('div.custom-pipeline-toggle > div.toggle.checkbox');

    //assert that 5 stages are displayed
    let stagesDisplayed = findAll('li.stage-list__card');
    assert.equal(stagesDisplayed.length, 5, '5 stages are displayed');
    assert.dom('button#add-stage').isNotVisible('add stage button is not visible');
    //remove a stage
    await click(findAll('li.stage-list__card a.delete-stage')[0]);//removes first stage
    //assert that 4 stages displayed
    let stagesDisplayedAfterRemove = findAll('li.stage-list__card');
    assert.equal(stagesDisplayedAfterRemove.length, 4, '4 displayed stages');
    //assert that add button reappeared
    assert.dom('button#add-stage').isVisible('add button reappeared');
    //assert that db is untouched
    let customPipeline = server.db.recruitingPipelines.findBy((pipeline) => pipeline.jobOpenings.includes(jobOpening.id));
    assert.notOk(customPipeline, 'no db entry made yet');
    //click next
    await click('button[type="submit"]');
    //assert that db changed accordingly with 4 stages now
    let customPipelineAfterSave = server.db.recruitingPipelines.findBy((pipeline) => pipeline.jobOpenings.includes(jobOpening.id));
    assert.ok(customPipelineAfterSave, 'custom pipeline created in db');
    assert.equal(customPipelineAfterSave.stages.length, 4, 'custom pipeline has 4 stages');
  });

  test('stages can be edited and saved', async function (assert) {
    let { company } = await authenticate.call(this, server),
        job = server.create('job', { company: company.id }),
        jobOpening = server.create('job-opening', {
          company,
          job
        }),
        editedStageName = 'Edited Stage';
    server.create('recruiting-pipeline', { company: company.id });

    await visit(`/account/recruiting/job-opening/${jobOpening.id}/settings`);
    await click('div.custom-pipeline-toggle > div.toggle.checkbox');

    //click edit stage
    await click(findAll('.card-content__stage-name > a[href="#"] > .edit.icon')[0]);
    //assert that modal says editing
    assert.dom('#modal__add-stage > .header').includesText('Edit', 'Header says editing pipeline stage');
    //fillIn editedStageName
    await fillIn('#modal__add-stage input[name="name"]', editedStageName);
    //submit
    await click('.confirm-add-stage');
    //assert that stage name is changed on page
    assert.dom(findAll('li.stage-list__card')[0]).includesText(editedStageName, 'Edited stage is displayed');
    //assert that db still has no custom pipeline
    let customPipeline = server.db.recruitingPipelines.findBy((pipeline) => pipeline.jobOpenings.includes(jobOpening.id));
    assert.notOk(customPipeline, 'no db entry made yet');
    //save it
    await click('button[type="submit"]');
    //assert that db changed
    let customPipelineAfterSave = server.db.recruitingPipelines.findBy((pipeline) => pipeline.jobOpenings.includes(jobOpening.id));
    assert.ok(customPipelineAfterSave, 'entry made to db');
    assert.equal(customPipelineAfterSave.stages[0].name, editedStageName, 'edited stage name saved in db');
  });

  test('canceling pipeline-stage add', async function (assert) {
    let { company } = await authenticate.call(this, server),
        pipeline = server.create('recruiting-pipeline', { company: company.id }),
        job = server.create('job', { company: company.id }),
        jobOpening = server.create('job-opening', {
          company,
          job
        }),
        stageCountInDB = pipeline.stages.length;

    await visit(`/account/recruiting/job-opening/${jobOpening.id}/settings`);
    await click('div.custom-pipeline-toggle > div.toggle.checkbox');

    assert.equal(findAll('.stage-list__card').length, stageCountInDB, 'correct number of stages displayed initially');

    await click('#add-stage');
    await click('#modal__add-stage button.red');

    let stageCountInDBAfter = pipeline.stages.length;
    assert.equal(stageCountInDBAfter, stageCountInDB, 'no stages were added unnecessarily');
    assert.equal(findAll('.stage-list__card').length, stageCountInDB, 'correct number of stages are displayed after cancelling');
  });
});
