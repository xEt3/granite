import Ember from 'ember';

const { Route, inject: { service } } = Ember;

export default Route.extend({
  auth: service(),
  ajax: service(),

  model () {
    return this.get('ajax').request(`/api/v1/company/${this.get('auth.user.company.id')}/billing`)
    .then(result => result.subscription);
  }
});
