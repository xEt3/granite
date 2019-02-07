import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import authenticate from 'granite/tests/helpers/auth';
import { visit, findAll } from '@ember/test-helpers';

module('Acceptance | eeo-report', function (hooks) {
  setupApplicationTest(hooks);

  test('eeo report displays correctly', async function (assert) {
    await authenticate.call(this, server);
    let job = await server.create('job');
    await server.create('job-opening', {
      job,
      title: job.title
    });

    await visit(`/account/recruiting/job-opening/${job.id}/eeo-reporting`);

    assert.dom('div.ui.pointing.menu > a:nth-child(4)').isVisible('eeo tab is visible');
    assert.dom('table.eeo-table').isVisible('table is on screen');
    assert.equal(findAll('table.eeo-table > thead > tr > th').length, 8, '8 headers are on table, column number is correct');
    assert.equal(findAll('table.eeo-table > tbody > tr').length, 6, '6 rows of data');
    assert.equal(findAll('table.eeo-table tbody > tr:first-child > td').length, 1, 'only one table cell in section row');
    assert.equal(findAll('table.eeo-table tbody > tr:nth-child(5) > td').length, 1, 'only one table cell in section row');
    assert.dom('table.eeo-table tbody > tr:first-child > td').hasAttribute('colspan', '8');

    findAll('table.eeo-table > thead > tr > th').forEach(header => {
      let fontWeight = window.getComputedStyle(header).getPropertyValue('font-weight');
      assert.ok(fontWeight === 'bold' || '700', 'header is bolded');
    });

    for (let i = 1; i <= 6; i++) {
      let cell = document.querySelector(`table.eeo-table tbody > tr:nth-child(${i}) > td:first-child`);
      let fontWeight = window.getComputedStyle(cell).getPropertyValue('font-weight');
      assert.ok(fontWeight === 'bold' || '700', 'first column cell is bolded');
    }
  });
});
