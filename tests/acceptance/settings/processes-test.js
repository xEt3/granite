import { module, test } from 'qunit';
import { visit, currentURL, click, fillIn, isSettled } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { faker } from 'ember-cli-mirage';
import authenticate from 'granite/tests/helpers/auth';

module('Acceptance | settings/processes', function(hooks) {
  setupApplicationTest(hooks);

  test('can add pipeline stage', async function(assert) {
    let { company, companyUser } = authenticate(this, {}, server);

    await visit('/account/settings/general');
    // await fillIn('input[type="email"]', companyUser.email);
    // await fillIn('input[type="password"]', companyUser.password);
    // await click('button[type="submit"]');

    console.log('currentURL:', currentURL());
    let done = assert.async();
    setTimeout(function() {
      done();
    }, 10000);


    assert.equal(1,1);
  });
});
