import Ember from 'ember';
import add from 'granite/mixins/route-abstractions/add';

const { Route, RSVP, inject } = Ember;

export default Route.extend(add, {
  auth: inject.service(),
  modelName: 'action-item',

  getModelDefaults () {
    return {
      owner: this.get('auth.user.employee'),
      company: this.get('auth.user.company')
    };
  },

  model () {
    return RSVP.hash({
      actionItem: this._super(...arguments),
      actionItems: this.store.query('action-item', {
        completedOn: { $not: { $type: 9 } },
        cancelledOn: { $not: { $type: 9 } }
      }),
      users: this.store.findAll('company-user')
    });
  },

  setupController ( controller, model ) {
    controller.setProperties({
      model: model.actionItem,
      actionItems: model.actionItems,
      user: model.users
    });
  }
});
