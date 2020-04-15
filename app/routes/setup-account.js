import classic from 'ember-classic-decorator';
import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

@classic
export default class SetupAccountRoute extends Route {
  titleToken = 'Setup Account';

  @service
  ajax;

  @service
  auth;

  beforeModel() {
    if (this.get('auth.authenticated')) {
      return this.transitionTo('index');
    }
  }

  model(params) {
    return this.ajax
    .request(`/api/v1/company-user/activation-status/${params.user_id}/${params.a}`)
    .then(res => res.companyUser);
  }
}
