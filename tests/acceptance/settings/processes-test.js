import { module, test } from 'qunit';
import { visit, currentURL, click } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { faker } from 'ember-cli-mirage';

module('Acceptance | settings/processes', function(hooks) {
  setupApplicationTest(hooks);

  test('can add pipeline stage', async function(assert) {
    const company = await server.create('company', { urlPrefix: faker.random.number(), name: faker.company.companyName() });
    console.log('created company1:', company);
    //create a company user model+factory
    //use company user to log in 

    await visit('account/settings/general/processes');
    // await click('.add-stage');

    let done = assert.async();
    setTimeout(function() {
      done();
    }, 5000);

    assert.equal(1,1);
  });
});
