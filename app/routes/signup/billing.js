import classic from 'ember-classic-decorator';
import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';
import RSVP from 'rsvp';

@classic
export default class BillingRoute extends Route {
  titleToken = 'Billing';

  @service
  ajax;

  model () {
    return RSVP.hash({
      token:   this.ajax.request('/api/v1/bt/token'),
      company: this.modelFor('signup.index')
    });
  }

  setupController (controller, model) {
    controller.setProperties({
      model:          model.company,
      braintreeToken: model.token
    });
  }
}
