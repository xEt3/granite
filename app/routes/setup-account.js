import Route from 'granite/core/route';
import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

export default class SetupAccountRoute extends Route {
  titleToken = 'Setup Account'

  @service ajax
  @service auth

  beforeModel () {
    if (this.auth.authenticated) {
      return this.transitionTo('index');
    }
  }

  async model (params) {
    let res = await this.ajax.request(`/api/v1/company-user/activation-status/${params.user_id}/${params.a}`);
    return res.companyUser;
  }
}
