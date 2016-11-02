import Ember from 'ember';

const { Route, inject } = Ember;

export default Route.extend({
  ajax: inject.service(),
  auth: inject.service(),

  beforeModel () {
    if ( this.get('auth.authenticated') ) {
      return this.transitionTo('index');
    }
  },

  model ( params ) {
    return this.get('ajax')
    .request(`/api/v1/company-user/activation-status/${params.userId}/${params.a}`)
    .then(res => res.companyUser);
  }
});
