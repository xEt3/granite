import Ember from 'ember';

const { Route, inject } = Ember;

export default Route.extend({
  auth: inject.service(),

  model () {
    return this.store.findRecord('company', this.get('auth.user').get('content').belongsTo('company').id(), { reload: true });
  },

  actions: {
    refresh () {
      this.refresh();
    }
  }
});
