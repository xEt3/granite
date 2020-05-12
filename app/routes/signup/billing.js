import Route from 'granite/core/route';
import { inject as service } from '@ember/service';

export default class SignupBillingRoute extends Route {
  titleToken = 'Billing'

  @service ajax

  async model () {
    let company = await this.modelFor('signup/index');

    return {
      token: await this.ajax.request('/api/v1/bt/token'),
      company
    };
  }

  setupController (controller, model) {
    controller.setProperties({
      model:          model.company,
      braintreeToken: model.token
    });
  }
}
