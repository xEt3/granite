import { module, test } from 'qunit';
import { visit, currentURL, click, find, findAll, fillIn } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
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
    await new Promise(resolve => setTimeout(resolve, 1000));
    await click('.confirm-modal.active button.green');

    let stageCountInDBAfterRemove = server.db.recruitingPipelines.find(pipeline.id).stages.length;

    assert.equal(stageCountInDBAfterRemove, stageCountInDB, 'stage count uneffected because stages not saved yet');
    assert.equal(findAll('.stage-list__card').length, stageCountInDB - 1, 'correct number of stages are displayed after removal');
    await click('button[type="submit"]');

    let stageCountInDBAfterSave = server.db.recruitingPipelines.find(pipeline.id).stages.length;
    assert.equal(stageCountInDBAfterSave, stageCountInDB - 1, 'stage count down one after save');
    assert.equal(findAll('.stage-list__card').length, stageCountInDB - 1, 'correct number of stages are displayed after removal');
  });

  test('editing and saving pipeline stage name', async function(assert) {
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

    await click('button[type="submit"]');

    let dbStagesAfterSave = server.db.recruitingPipelines.find(pipeline.id).stages;
    assert.equal(dbStagesAfterSave.length, pipeline.stages.length, 'no added stages in db');
    assert.equal(dbStagesAfterSave[0].name, newStageName, 'name of edited stage saved in db');

    let stageCardsAfterSave = findAll('.stage-list__card');
    assert.equal(stageCardsAfterSave.length, pipeline.stages.length, 'no stages accidentally added after save');
    assert.dom(stageCardsAfterSave[0]).includesText(newStageName, 'edited stage still has correct new name after save');
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

  test('adding and saving cas functions properly', async function(assert) {
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
    await click('#modal__add-cas button.primary');

    let casAmountAfterAdd = server.db.companies.find(company.id).correctiveActionSeverityIds.length;
    assert.equal(casAmountAfterAdd, initialCasAmount, 'cas amount in db is unchanged because addition not saved yet');
    assert.equal(findAll('div.ui.list > div.item').length, initialCasAmount + 1, 'added cas is displayed on screen');
    let displayedSeveritiesAfterAdd = findAll('div.ui.list > div.item');
    assert.dom(displayedSeveritiesAfterAdd[displayedSeveritiesAfterAdd.length - 1]).includesText(newName, 'cas addition is listed last and has correct name');
    assert.dom(displayedSeveritiesAfterAdd[displayedSeveritiesAfterAdd.length - 1]).includesText(newOrder, 'cas addition is displaying correct order');
    await click('button[type="submit"]');

    let casIdsAfterSave = server.db.companies.find(company.id).correctiveActionSeverityIds;
    assert.equal(casIdsAfterSave.length, initialCasAmount + 1, 'cas amount in db is +1');
    assert.equal(findAll('div.ui.list > div.item').length, initialCasAmount + 1, 'correct amount of displayed cas is still correct after save');
    assert.equal(server.db.correctiveActionSeverities.findBy({ name: newName }).formal, false, 'formal is false because it was not checked in the modal');
  });

  test('formal flag gets saved on cas correctly', async function(assert) {
    let { company } = await authenticate.call(this, server),
        newName = 'New Cas2',
        newOrder = company.correctiveActionSeverityIds.length + 1;
    server.create('recruiting-pipeline', { company: company.id });

    await visit('/account/settings/general/processes');
    await click('#add-cas');
    await fillIn('#modal__add-cas input[name="name"]', newName);
    await fillIn('#modal__add-cas input[name="order"]', newOrder);
    await click('#modal__add-cas div.ui.checkbox');
    await click('#modal__add-cas button.primary');
    await click('button[type="submit"]');

    let dbEntryForNewCas = server.db.correctiveActionSeverities.findBy({ name: newName });
    assert.equal(dbEntryForNewCas.formal, true, 'formal is set to true on saved db cas');
  });

  test('remove and saving cas', async function(assert) {
    let { company } = await authenticate.call(this, server);
    server.create('recruiting-pipeline', { company: company.id });

    await visit('/account/settings/general/processes');

    let  casInDb = company.correctiveActionSeverities;
    let casDisplayed = findAll('div.ui.list > div.item');
    assert.equal(casInDb.length, casDisplayed.length, 'cas displayed matches cas in db');

    await click(findAll('div.ui.list a.right')[0]);
    await new Promise(resolve => setTimeout(resolve, 1000));
    await click('.confirm-modal.active button.green');

    let casInDbAfterRemove = server.db.companies.find(company.id).correctiveActionSeverityIds;
    let casDisplayedAfterRemove = findAll('div.ui.list > div.item');
    assert.equal(casDisplayedAfterRemove.length, casDisplayed.length - 1, 'deleted cas is not displayed any longer');
    assert.equal(casInDbAfterRemove.length, casInDb.length, 'db is untouched because remove has not been saved yet');

    await click('button[type="submit"]');

    let casInDbAfterSave = server.db.companies.find(company.id).correctiveActionSeverityIds;
    let casDisplayedAfterSave = findAll('div.ui.list > div.item');
    assert.equal(casDisplayedAfterSave.length, casDisplayed.length - 1, 'correct number of cas are still displayed after saving');
    assert.equal(casInDbAfterSave.length, casInDb.length - 1, 'removed cas was removed in db');
  });

  test('editing and saving cas', async function(assert) {
    let { company } = await authenticate.call(this, server),
        newName = 'Edited Cas',
        newOrder = 1000000;
    server.create('recruiting-pipeline', { company: company.id });

    await visit('/account/settings/general/processes');

    let casDisplayed = findAll('div.ui.list > div.item');
    let casInDb = company.correctiveActionSeverities;
    let initialCasBeingEdited = server.db.correctiveActionSeverities.find(company.correctiveActionSeverityIds[0]);
    assert.equal(casDisplayed.length, casInDb.length, 'cas displayed matches cas in db');

    await click('div.ui.list > div.item > div.item > a');
    await fillIn('#modal__add-cas input[name="name"]', newName);
    await fillIn('#modal__add-cas input[name="order"]', newOrder);
    await click('#modal__add-cas div.ui.checkbox');
    await click('#modal__add-cas button.primary');

    let casDisplayedAfterEdit = findAll('div.ui.list > div.item');
    let casInDbAfterEdit = server.db.companies.find(company.id).correctiveActionSeverityIds;
    assert.equal(casDisplayedAfterEdit.length, casDisplayed.length, 'no new cas are displayed accidentally after edit');
    assert.dom(casDisplayedAfterEdit[0]).includesText((newName, newOrder), 'edited cas displays new new and new order correctly');
    assert.equal(casInDbAfterEdit.length, casInDb.length, 'db is untouched after edit');

    await click('button[type="submit"]');

    let casDisplayedAfterSave = findAll('div.ui.list > div.item');
    let casInDbAfterSave = server.db.companies.find(company.id).correctiveActionSeverityIds;
    let editedCasInDb = server.db.correctiveActionSeverities.find(casInDbAfterSave[0]);
    assert.dom(casDisplayedAfterSave[0]).includesText((newName, newOrder), 'edited cas still displayed correctly after save');
    assert.equal(casInDbAfterSave.length, casInDb.length, 'no cas were accidentally added or removed after saving');
    assert.equal(editedCasInDb.name, newName, 'saved edited cas has correct name in db');
    assert.equal(editedCasInDb.order, newOrder, 'saved edited cas has correct order in db');
    assert.equal(editedCasInDb.formal, true, 'saved edited cas is set to formal');
    assert.equal(editedCasInDb.id, initialCasBeingEdited.id, 'edited cas has same id as original');
    assert.notEqual(editedCasInDb.name, initialCasBeingEdited.name, 'cas name was actually changed after save in db');
    assert.notEqual(editedCasInDb.order, initialCasBeingEdited.order, 'cas order was actually changed after save in db');
    assert.notEqual(editedCasInDb.formal, initialCasBeingEdited.formal, 'cas formal was actually changed after save in db');
  });

  test('save button is disabled properly', async function(assert) {
    let { company } = await authenticate.call(this, server),
        pipeline = server.create('recruiting-pipeline', { company: company.id });

    await visit('/account/settings/general/processes');

    assert.dom('button[type="submit"]').isDisabled('button is disabled right off the bat');

    await click(findAll('.card-content__stage-name > a[href="#"] > .edit.icon')[0]);
    await fillIn('#modal__add-stage input[name="name"]', 'Hiya');
    await click('.confirm-add-stage');

    assert.dom('button[type="submit"]').isNotDisabled('submit button is now clickable after change made');

    await fillIn('#modal__add-stage input[name="name"]', pipeline.stages[0].name);
    await click('.confirm-add-stage');

    assert.dom('button[type="submit"]').isDisabled('save button is disabled again after change was reverted');
  });

  test('save button disables after save is made', async function(assert) {
    let { company } = await authenticate.call(this, server);
    server.create('recruiting-pipeline', { company: company.id });

    await visit('/account/settings/general/processes');
    let submitButton = find('button[type="submit"]');

    assert.dom(submitButton).isDisabled('button is disabled right off the bat');

    await click(findAll('.card-content__stage-name > a[href="#"] > .edit.icon')[0]);
    await fillIn('#modal__add-stage input[name="name"]', 'Hiya');
    await click('.confirm-add-stage');

    assert.dom(submitButton).isNotDisabled('submit button is now clickable after change made');

    await click(submitButton);

    assert.dom(submitButton).isDisabled('save button is disabled again after save');
  });

  test('pipeline stages are displayed in the correct order', async function(assert) {
    let { company } = await authenticate.call(this, server),
        pipeline = server.create('recruiting-pipeline', { company: company.id });

    await visit('/account/settings/general/processes');

    let displayedCas = findAll('.card-content__stage-name');

    pipeline.stages.forEach((s, i) => {
      assert.dom(displayedCas[i]).includesText(s.name);
    });
  });

  test('pipeline stages caps at 5', async function(assert) {
    let { company } = await authenticate.call(this, server),
        pipeline = server.create('recruiting-pipeline', { company: company.id });

    await pipeline.stages.addObject({
      created : moment().subtract(1, 'week'),
      order : 3,
      name : 'Stage 4',
      _id : '5b72da4a53889f02bd1486dz'
    });

    await visit('/account/settings/general/processes');

    assert.equal(pipeline.stages.length, 4, 'there are currently 4 stages');
    assert.dom('button#add-stage').isVisible('add stage button is showing because there are only 4 stages');

    await click('#add-stage');
    await fillIn('#modal__add-stage input[name="name"]', 'fifth stage');
    await click('.confirm-add-stage');
    await click('button[type="submit"]');

    assert.equal(server.db.recruitingPipelines.find(pipeline.id).stages.length, 5, 'there are now 5 stages');
    assert.dom('button#add-stage').isNotVisible('add stage button should not be visible because there are 5 stages');

    await click(find('a.delete-stage'));
    await new Promise(resolve => setTimeout(resolve, 1000));
    await click('.confirm-modal.active button.green');
    await click('button[type="submit"]');

    assert.equal(server.db.recruitingPipelines.find(pipeline.id).stages.length, 4, 'deleted stage, so size back down to 4');
    assert.dom('button#add-stage').isVisible('add stage button is showing because there are 4 stages again');
  });
});
