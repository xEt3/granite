import Ember from 'ember';
import { correctiveActionDescription } from 'granite/config/suggestions';
import add from 'granite/mixins/route-abstractions/add';

const {
  Route,
  RSVP,
  inject: { service }//,
  // computed
} = Ember;

export default Route.extend(add, {
  auth: service(),
  ajax: service(),
  modelName: 'corrective-action',

  model () {
    return RSVP.hash({
      correctiveAction: this._super(...arguments)//,
      // employees:        this.get('employees')
    });
  },

  getModelDefaults () {
    return {
      creator: this.get('auth.user.employee'),
      description: correctiveActionDescription,
      employee: this.modelFor('account.employee'),
      employeeIssue: this.modelFor('account.employee.index.counseling.issue').issue
    };
  },

  setupController (controller, model) {
    controller.setProperties({
      model:      model.correctiveAction//,
      // employees:  model.employees
    });
  }//,

  // employees: computed(function () {
  //   return this.store.query('employee', {
  //     _id: {
  //       $nin: [
  //         this.get('auth.user.employee.id'),
  //         this.modelFor('account.employee').get('id')
  //       ]
  //     }
  //   });
  // })
});
