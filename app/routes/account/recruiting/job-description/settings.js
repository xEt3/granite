import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.modelFor('account.recruiting.job-description');
  }
});
