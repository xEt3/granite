import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | list-item/dashboard/continue-action', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // We have to setup the router to get link-tos rendering properly
    this.owner.lookup('router:main').setupRouter();

    const scenarios = [{
      model: {
        id:                 '123',
        description:        'some description',
        continuationAction: 'EMPLOYEE_ONBOARDING'
      },
      linkAssert: '/account/employee/123/onboard/start'
    }, {
      model: {
        id:                 '123',
        description:        'some description',
        continuationAction: 'EMPLOYEE_OFFBOARDING'
      },
      linkAssert: '/account/employee/123/offboard/start'
    }, {
      model: {
        id:                 '123',
        description:        'some description',
        continuationAction: 'JOBOPENING_ATS'
      },
      linkAssert: '/account/recruiting/job-opening/123/applicant-tracking'
    }, {
      model: {
        id:                 '123',
        description:        'some description',
        continuationAction: 'JOBOPENING_SETUP'
      },
      linkAssert: '/account/recruiting/job-opening/123/setup'
    }];

    for (let i = 0; i < scenarios.length; i++) {
      let { model, linkAssert } = scenarios[i];

      this.set('model', model);
      await render(hbs`{{list-item/dashboard/continue-action model}}`);
      assert.dom('a', this.element).includesText(model.description);
      assert.dom('a', this.element).hasAttribute('href', linkAssert);
    }
  });
});
