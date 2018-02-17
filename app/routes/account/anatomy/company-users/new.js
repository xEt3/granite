import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import { inject as service } from '@ember/service';
import add from 'granite/mixins/route-abstractions/add';

export default Route.extend(add, {
  auth: service(),
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
