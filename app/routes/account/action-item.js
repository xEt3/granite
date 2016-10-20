import Ember from 'ember';

const { Route, RSVP, inject } = Ember;

export default Route.extend({
  auth: inject.service(),

  model ( params ) {
    return RSVP.hash({
      actionItem: this.store.queryRecord('action-item', {
        title: params.slug.replace(/-/g, ' ')
      }),
      companyUsers: this.store.query('company-user', {
        _id: { $ne: this.get('auth.user._id') },
        select: 'name'
      })
    })
    .then(result => {
      this.set('transferableTargets', result.companyUsers);
      return result.actionItem;
    });
  },

  setupController (controller, model) {
    controller.setProperties({
      model,
      transferableTargets: this.get('transferableTargets')
    });
  }
});
