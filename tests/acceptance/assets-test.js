import { module, test } from 'qunit';
import moduleForAcceptance from 'granite/tests/helpers/module-for-acceptance';
import { setupApplicationTest } from 'ember-qunit';
import authenticate from 'granite/tests/helpers/auth';
import { visit, currentURL, click, pauseTest, find, findAll, settled, fillIn} from '@ember/test-helpers';

module('Acceptance | company assets', function(hooks) {
  setupApplicationTest(hooks);

  test('getting to the assets',async function(assert){
    await authenticate.call(this, server);
    await visit('/account/assets');
    assert.equal(currentURL(), '/account/assets', 'on assets page');
  });

  test('no assets',async function(assert){
    await authenticate.call(this, server);
    await visit('/account/assets');
    assert.equal(currentURL(), '/account/assets', 'on assets page');
    assert.ok(find('.ui.right.floated.pagination.menu'), 'pagination menu is on page');
    assert.ok(find('a[href="/account/assets/new"]'), 'plus icon is on page');
    let $header = find('.ui.center.aligned.header');
    assert.equal($($header).text().replace(/\s\s+|\n/g, ''), 'No assets available.', 'No assets were available');
  });

  test('list of assets',async function(assert){
    await server.createList('assets', 500);
    await server.createList('asset-items', 7);
    await authenticate.call(this, server);
    await visit('/account/assets');
    await pauseTest();
    assert.equal(currentURL(), '/account/assets', 'on assets page');
  });

});

// No assets available.
