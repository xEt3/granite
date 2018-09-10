import { module, test } from 'qunit';
import { visit, currentURL, click, find, findAll, fillIn, settled /*, isSettled */} from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
// import { faker } from 'ember-cli-mirage';
import authenticate from 'granite/tests/helpers/auth';

module('Acceptance | settings/processes', function(hooks) {
  setupApplicationTest(hooks);

  test('pipeline-stage modal presents', async function(assert) {
    let { company } = await authenticate.call(this, server);
    server.create('recruiting-pipeline', { company: company.id });

    await visit('/account/settings/general/processes');
    assert.equal(currentURL(), '/account/settings/general/processes', 'page exists and visible');

    assert.ok(find('.add-stage'), 'add stage button exists');

    await click('.add-stage');
    assert.dom('div[id="modal__add-stage"').isVisible('add stage modal is visible');
  });

  test('corrective action severity modal presents', async function(assert) {
    let { company } = await authenticate.call(this, server);
    server.create('recruiting-pipeline', { company: company.id });

    await visit('/account/settings/general/processes');
    assert.ok(find('.add-cas'), 'add stage button exists');

    await click('.add-cas');
    assert.dom('div[id="modal__add-cas"').isVisible('add cas modal is visible');
  });

  test('canceling pipeline-stage add', async function(assert) {
    let { company } = await authenticate.call(this, server);
    let pipeline = server.create('recruiting-pipeline', { company: company.id });
    let stageCountInDB = pipeline.stages.length;

    await visit('/account/settings/general/processes');
    assert.equal(findAll('.stage-list__card').length, stageCountInDB, 'correct number of stages displayed initially');

    await click('.add-stage');
    await click('.cancel-add-stage');

    let stageCountInDBAfter = pipeline.stages.length;
    assert.equal(stageCountInDBAfter, stageCountInDB, 'no stages were added unnecessarily');
    assert.equal(findAll('.stage-list__card').length, stageCountInDB, 'correct number of stages are displayed after cancelling');
  });

  test('adding pipeline stage', async function(assert) {
    let { company } = await authenticate.call(this, server);
    let pipeline = server.create('recruiting-pipeline', { company: company.id });
    let stageCountInDB = pipeline.stages.length;
    let nameOfNewStage = 'Added Test Stage';

    await visit('/account/settings/general/processes');
    assert.equal(findAll('.stage-list__card').length, stageCountInDB, 'correct number of stages displayed initially');

    await click('.add-stage');
    await fillIn('input[placeholder="ex. Interview"]', nameOfNewStage);
    await click('.confirm-add-stage');

    let stageCountInDBAfterAdd = server.db.recruitingPipelines.find(pipeline.id).stages.length;
    let displayedStages = findAll('.stage-list__card');

    assert.equal(stageCountInDBAfterAdd, stageCountInDB, 'stage count uneffected because stages not saved yet');
    assert.equal(displayedStages.length, stageCountInDB + 1, 'correct number of stages are displayed after adding');
    await click('button[type="submit"]');

    let stageCountInDBAfterSave = server.db.recruitingPipelines.find(pipeline.id).stages.length;
    assert.equal(stageCountInDBAfterSave, stageCountInDB + 1, 'stage count plus one after save');
    assert.dom(displayedStages[displayedStages.length - 1]).includesText(nameOfNewStage, 'last displayed stage is the newly added stage');
  });

  test('removing pipeline stage', async function(assert) {
    let { company } = await authenticate.call(this, server),
        pipeline = server.create('recruiting-pipeline', { company: company.id }),
        stageCountInDB = pipeline.stages.length;

    await visit('/account/settings/general/processes');
    let deleteStageLinks = findAll('.delete-stage');

    assert.equal(findAll('.stage-list__card').length, stageCountInDB, 'correct number of stages displayed initially');
    assert.equal(deleteStageLinks.length, stageCountInDB, 'all stages have remove button');

    await click(deleteStageLinks[deleteStageLinks.length - 1]);
    await click(findAll('button[class="ui inverted green right labeled icon button"]')[2]);//confirm button for stage removal

    let stageCountInDBAfterRemove = server.db.recruitingPipelines.find(pipeline.id).stages.length;

    assert.equal(stageCountInDBAfterRemove, stageCountInDB, 'stage count uneffected because stages not saved yet');
    assert.equal(findAll('.stage-list__card').length, stageCountInDB - 1, 'correct number of stages are displayed after removal');
    await click('button[type="submit"]');

    let stageCountInDBAfterSave = server.db.recruitingPipelines.find(pipeline.id).stages.length;
    assert.equal(stageCountInDBAfterSave, stageCountInDB - 1, 'stage count down one after save');
  });
  //edit stage
  //close modal and same x cas are there
  //add cas and x+1 cas appear
  //remove cas and x-1 stages appear
  //edit cas
});

// let done = assert.async();
// setTimeout(function() {
//   done();
// }, 10000);
