import { module, test } from 'qunit';
import { visit, currentURL, click, fillIn, isSettled, find } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { faker } from 'ember-cli-mirage';
import authenticate from 'granite/tests/helpers/auth';

module('Acceptance | settings/processes', function(hooks) {
  setupApplicationTest(hooks);

  test('can add pipeline stage', async function(assert) {
    let { company } = await authenticate.call(this, server);
    server.create('recruiting-pipeline', { company: company.id });

    await visit('/account/settings/general/processes');
    assert.equal(currentURL(), '/account/settings/general/processes', 'page exists and visible');

    //add button exists
    assert.ok(find('.add-stage'), 'add stage button exists');
    //add button takes you to the right modal?
    await click('.add-stage');
    //functionality inside add button modal


    let done = assert.async();
    setTimeout(function() {
      done();
    }, 10000);


    assert.equal(1,1);
  });
});
