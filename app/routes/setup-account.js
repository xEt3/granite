import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  titleToken: 'Setup Account',
  ajax: service(),
  auth: service(),

  beforeModel () {
    if ( this.get('auth.authenticated') ) {
      return this.transitionTo('index');
    }
  },

  model ( params ) {
    return this.get('ajax')
    .request(`/api/v1/company-user/activation-status/${params.user_id}/${params.a}`)
    .then(res => res.companyUser);
  }
});
