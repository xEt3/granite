import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import moment from 'moment';

module('Integration | Component | list-item/certification-item', function (hooks) {
  setupRenderingTest(hooks);

  test('it displays basic properties', async function (assert) {
    let fakeData = {
      name:            'A Test',
      renews:          true,
      nextRenewalDate: moment().add(1, 'year').toDate(),
      created:         new Date()
    };

    this.set('model', fakeData);

    await render(hbs`<ListItem::CertificationItem @model={{this.model}} />`);

    assert.dom(this.element, '.content .header').includesText(fakeData.name);
    assert.dom(this.element, '.content .header').includesText(`Renewal in a year on ${moment(fakeData.nextRenewalDate).format('M/D/YY')}`);
    assert.dom(this.element, '.content .header').includesText('Added just now');
  });

  test('it displays document label', async function (assert) {
    let fakeData = {
      name:             'Doc Test',
      renews:           true,
      nextRenewalDate:  moment().add(1, 'year').toDate(),
      created:          new Date(),
      requiresDocument: true,
      document:         {}
    };

    this.set('model', fakeData);

    await render(hbs`<ListItem::CertificationItem @model={{this.model}} />`);

    assert.dom(this.element, '.content .header').includesText(fakeData.name);
    assert.dom(this.element, '.content .meta .green.label').includesText('Document uploaded');
  });
});
