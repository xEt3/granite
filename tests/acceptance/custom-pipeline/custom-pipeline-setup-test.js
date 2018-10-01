import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | custom pipeline/custom pipeline setup', function (hooks) {
  setupApplicationTest(hooks);

  test('toggling custom pipeline displays default stages', async function (assert) {
    //navigate to job-opening/setup/Settings
    //click toggle
    //assert that stages are displayed correctly
    let done = assert.async();
    setTimeout(() => {
      done();
    }, 10000);
    assert.equal(1, 1, 'generic test');
  });
});

//probably going to need to cherry pick bits and pieces from other pipeline related PR
//test that toggle displays default pipeline's stages
//test that hitting toggle doesn't save db object
//test that hitting toggle again takes custom off of screen
//test that hitting next saves the custom pipeline
//test that stage can be added - not saved until next hit
//test that stage can't be added when there are already 5 stages
//test that button comes back when 5th stage is deleted
//test that stage can be removed - not saved until next hit
//test that stage can be edited - not saved until next hit
//test that pipeline is deleted once custom is turned off - must be saved first

//WILL HAVE TO REPEAT FOR NOT-SETUP SETTINGS *should be same tests
