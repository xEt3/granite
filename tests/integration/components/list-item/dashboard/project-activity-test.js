import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import moment from 'moment';

module('Integration | Component | list-item/dashboard/project-activity', function (hooks) {
  setupRenderingTest(hooks);

  test('it works', async function (assert) {
    // We have to setup the router to get link-tos rendering properly
    this.owner.lookup('router:main').setupRouter();

    const scenarios = [{
      model: {
        dateValue: moment().add(3, 'days').toISOString(),
        id:        '123',
        title:     'Test Me',
        type:      'dueOn'
      },
      textAssert: 'Test Me is due in 3 days'
    }, {
      model: {
        dateValue: moment().add(2, 'weeks').toISOString(),
        id:        '123',
        title:     'Test Me',
        type:      'delayedUntil'
      },
      textAssert: `Test Me was delayed until ${moment().add(2, 'weeks').format('M/D/YY')}`
    }, {
      model: {
        dateValue: moment().subtract(3, 'days').toISOString(),
        id:        '123',
        title:     'Test Me',
        type:      'cancelledOn'
      },
      textAssert: 'Test Me was cancelled 3 days ago'
    }, {
      model: {
        dateValue: moment().subtract(3, 'days').toISOString(),
        id:        '123',
        title:     'Test Me',
        type:      'completedOn'
      },
      textAssert: 'Test Me was completed 3 days ago'
    }];

    for (let i = 0; i < scenarios.length; i++) {
      let { model, textAssert } = scenarios[i];

      this.set('model', model);
      await render(hbs`{{list-item/dashboard/project-activity model}}`);
      assert.dom(this.element).includesText(textAssert);
      assert.dom('a', this.element).hasAttribute('href', '/account/project/Test-Me');
    }
  });
});
