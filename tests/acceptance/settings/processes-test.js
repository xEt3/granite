import { module, test } from 'qunit';
import { visit, currentURL, click, find, findAll, fillIn, settled, isSettled, pauseTest } from '@ember/test-helpers';
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

    assert.ok(find('#add-stage'), 'add stage button exists');

    await click('#add-stage');
    assert.dom('div[id="modal__add-stage"').isVisible('add stage modal is visible');
  });

  test('corrective action severity modal presents', async function(assert) {
    let { company } = await authenticate.call(this, server);
    server.create('recruiting-pipeline', { company: company.id });

    await visit('/account/settings/general/processes');
    assert.ok(find('#add-cas'), 'add stage button exists');

    await click('#add-cas');
    assert.dom('div[id="modal__add-cas"').isVisible('add cas modal is visible');
  });

  test('canceling pipeline-stage add', async function(assert) {
    let { company } = await authenticate.call(this, server);
    let pipeline = server.create('recruiting-pipeline', { company: company.id });
    let stageCountInDB = pipeline.stages.length;

    await visit('/account/settings/general/processes');
    assert.equal(findAll('.stage-list__card').length, stageCountInDB, 'correct number of stages displayed initially');

    await click('#add-stage');
    await click('#modal__add-stage button.red');

    let stageCountInDBAfter = pipeline.stages.length;
    assert.equal(stageCountInDBAfter, stageCountInDB, 'no stages were added unnecessarily');
    assert.equal(findAll('.stage-list__card').length, stageCountInDB, 'correct number of stages are displayed after cancelling');
  });

  test('adding and saving pipeline stage', async function(assert) {
    let { company } = await authenticate.call(this, server);
    let pipeline = server.create('recruiting-pipeline', { company: company.id });
    let stageCountInDB = pipeline.stages.length;
    let nameOfNewStage = 'Added Test Stage';

    await visit('/account/settings/general/processes');
    assert.equal(findAll('.stage-list__card').length, stageCountInDB, 'correct number of stages displayed initially');

    await click('#add-stage');
    assert.dom('#modal__add-stage > .header').includesText('Add', 'Header says adding pipeline stage');
    assert.dom('#modal__add-stage button.red').isVisible('Cancel button is visible because we are adding stage');
    await fillIn('#modal__add-stage input[name="name"]', nameOfNewStage);
    await click('.confirm-add-stage');

    let stageCountInDBAfterAdd = server.db.recruitingPipelines.find(pipeline.id).stages.length;
    let displayedStages = findAll('.stage-list__card');

    assert.equal(stageCountInDBAfterAdd, stageCountInDB, 'stage count uneffected because stages not saved yet');
    assert.equal(displayedStages.length, stageCountInDB + 1, 'correct number of stages are displayed after adding');
    await click('button[type="submit"]');

    let stageCountInDBAfterSave = server.db.recruitingPipelines.find(pipeline.id).stages.length;
    assert.equal(stageCountInDBAfterSave, stageCountInDB + 1, 'stage count plus one after save');
    assert.equal(displayedStages.length, stageCountInDB + 1, 'correct number of stages are displayed after saving');
    assert.dom(displayedStages[displayedStages.length - 1]).includesText(nameOfNewStage, 'last displayed stage is the newly added stage');
  });

  test('removing and saving pipeline stage', async function(assert) {
    let { company } = await authenticate.call(this, server),
        pipeline = server.create('recruiting-pipeline', { company: company.id }),
        stageCountInDB = pipeline.stages.length;

    await visit('/account/settings/general/processes');
    let deleteStageLinks = findAll('.delete-stage');

    assert.equal(findAll('.stage-list__card').length, stageCountInDB, 'correct number of stages displayed initially');
    assert.equal(deleteStageLinks.length, stageCountInDB, 'all stages have remove button');
    await click(deleteStageLinks[deleteStageLinks.length - 1]);
    await click('.confirm-modal.animating button.green');//confirm button for stage removal

    let stageCountInDBAfterRemove = server.db.recruitingPipelines.find(pipeline.id).stages.length;

    assert.equal(stageCountInDBAfterRemove, stageCountInDB, 'stage count uneffected because stages not saved yet');
    assert.equal(findAll('.stage-list__card').length, stageCountInDB - 1, 'correct number of stages are displayed after removal');
    await click('button[type="submit"]');

    let stageCountInDBAfterSave = server.db.recruitingPipelines.find(pipeline.id).stages.length;
    assert.equal(stageCountInDBAfterSave, stageCountInDB - 1, 'stage count down one after save');
    assert.equal(findAll('.stage-list__card').length, stageCountInDB - 1, 'correct number of stages are displayed after removal');
  });

  test('editing pipeline stage name', async function(assert) {
    let { company } = await authenticate.call(this, server);
    let pipeline = server.create('recruiting-pipeline', { company: company.id });
    let newStageName = 'Edited Stage';

    await visit('/account/settings/general/processes');

    let editStageButtons = findAll('.card-content__stage-name > a[href="#"] > .edit.icon');
    assert.equal(editStageButtons.length, pipeline.stages.length, 'every stage has an edit button');

    await click(editStageButtons[0]);
    assert.dom('#modal__add-stage > .header').includesText('Edit', 'Header says editing pipeline stage');
    assert.dom('#modal__add-stage > .actions > .cancel-add-stage').doesNotExist('Cancel button is not visible because we are editing');

    await fillIn('#modal__add-stage input[name="name"]', newStageName);
    await click('.confirm-add-stage');

    let stageCardsAfterEdit = findAll('.stage-list__card');

    assert.equal(stageCardsAfterEdit.length, pipeline.stages.length, 'no new stages were accidentally created by edit');
    assert.dom(stageCardsAfterEdit[0]).includesText(newStageName, 'Stage that was edited has correct new name displaying');
    //save edits
    //assert that the db is how it should be
    //assert that correct number of stages are displayed
  });

  test('closing the add cas modal functions correctly', async function(assert) {
    let { company } = await authenticate.call(this, server);
    server.create('recruiting-pipeline', { company: company.id });

    await visit('/account/settings/general/processes');
    let initialCasAmount = company.correctiveActionSeverities.length;
    assert.equal(findAll('div.ui.list > div.item').length, initialCasAmount, 'correct number of cas are listed initially');

    await click('#add-cas');
    await click('#modal__add-cas button.red');

    assert.equal(findAll('div.ui.list > div.item').length, initialCasAmount, 'correct number of cas are listed after cancelling addition');
  });
  //add cas and x+1 cas appear
  test('adding cas functions properly', async function(assert) {
    let { company } = await authenticate.call(this, server);

    server.create('recruiting-pipeline', { company: company.id });
    let newName = 'New Cas';
    let newOrder = company.correctiveActionSeverityIds.length + 1;

    await visit('/account/settings/general/processes');
    let initialCasAmount = company.correctiveActionSeverityIds.length;
    assert.equal(findAll('div.ui.list > div.item').length, initialCasAmount, 'correct number of cas are listed initally');

    await click('#add-cas');
    assert.dom('#modal__add-cas > div.header').includesText('Add', 'Header says adding cas');
    assert.dom('#modal__add-cas button.red').isVisible('cancel button is visible when in the add cas modal');

    await fillIn('#modal__add-cas input[name="name"]', newName);
    await fillIn('#modal__add-cas input[name="order"]', newOrder);
    //click done
    await click('#modal__add-cas button.primary');
    //assert that list length in db is initial
    let casAmountAfterAdd = server.db.companies.find(company.id).correctiveActionSeverityIds.length;
    assert.equal(casAmountAfterAdd, initialCasAmount, 'cas amount in db is unchanged because addition not saved yet');
    //assert that list length on page is initial + 1
    assert.equal(findAll('div.ui.list > div.item').length, initialCasAmount + 1, 'added cas is displayed on screen');
    //assert that last cas has correct attributes in db and on page
    let displayedSeverities = findAll('div.ui.list > div.item');
    assert.dom(displayedSeverities[displayedSeverities.length - 1]).includesText(newName, 'cas addition is listed last and has correct name');
    assert.dom(displayedSeverities[displayedSeverities.length - 1]).includesText(newOrder, 'cas addition is displaying correct order');
    //save changes

    await click('button[type="submit"]');


    //assert that list length in db now initial + 1
    //assert that list length on page is still initial + 1



    let done = assert.async();
    setTimeout(() => {
      done();
    }, 10000);
    assert.equal(1, 1, 'generic assertion');
  });
  //check that formal gets checked correctly in the db
  //remove cas and x-1 stages appear
  //edit cas
});

// let done = assert.async();
// setTimeout(function() {
//   done();
// }, 10000);
