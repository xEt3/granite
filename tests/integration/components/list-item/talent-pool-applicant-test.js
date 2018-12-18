import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import Object from '@ember/object';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | list-item/talent-pool-applicant', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    let record = this.server.create('applicant');
    this.set('applicantData', Object.create({
      record: {
        ...record.attrs,
        fullName: `${record.firstName} ${record.lastName}`
      },
      meta: {
        meta: {
          avgScore:               62,
          lastApplication:        new Date(),
          lastApplicationId:      '1234',
          lastApplicationListing: '123',
          timesApplied:           1
        }
      }
    }));

    await render(hbs`{{list-item/talent-pool-applicant applicantData}}`);

    assert.dom('.talent-pool__applicant .content').exists();
    assert.dom('.talent-pool__applicant .header').hasText(`${record.firstName} ${record.lastName}`);
    assert.dom('.talent-pool__applicant .meta').includesText('Last Applied');
    assert.dom('.talent-pool__applicant .extra').includesText('Average Score: 62%');
    assert.dom('.talent-pool__applicant .right.floated.content').includesText('Open Last Job Application');
  });
});
