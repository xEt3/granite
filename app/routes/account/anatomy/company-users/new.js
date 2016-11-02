import Ember from 'ember';
import add from 'granite/mixins/route-abstractions/add';

const { Route, RSVP, inject } = Ember;

export default Route.extend(add, {
  auth: inject.service(),
  modelName: 'company-user',

  getModelDefaults () {
    return {
      company: this.get('auth.user.company')
    };
  },

  model () {
    return RSVP.hash({
      user: this._super(...arguments),
      employees: this.store.query('employee', {
        _id: { $ne: this.get('auth.user.employee.id') }
      })
    });
  },

  setupController ( controller, model ) {
    controller.setProperties({
      model: model.user,
      employees: model.employees
    });
  }
});
