import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | list-item/educate/employee-metric', function (hooks) {
  setupRenderingTest(hooks);

  test('it displays properly', async function (assert) {
    let fakeData = {
      fullName:  'Bob Rossy',
      jobTitle:  'Director of happy trees',
      completed: 2,
      assigned:  1,
      total:     3
    };

    this.set('model', fakeData);

    await render(hbs`{{list-item/educate/employee-metric model}}`);

    assert.dom('.educate__employee-metric').exists();
    assert.dom(this.element, '.content .employee-metric__name').includesText(fakeData.fullName);
    assert.dom(this.element, '.content .employee-metric__job-title').includesText(fakeData.jobTitle);
    assert.dom(this.element, '.content .employee-metric__job-completed').includesText('2 of 3');

    assert.dom('.employee-metric__prog').hasAttribute(
      'data-percent',
      `${Math.round(fakeData.completed / fakeData.total  * 100)}`
    );
  });
});
