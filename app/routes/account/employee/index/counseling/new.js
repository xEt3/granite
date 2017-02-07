import Ember from 'ember';
import add from 'granite/mixins/route-abstractions/add';
import { issueTypes } from 'granite/config/statics';

const {
  Route,
  RSVP,
  A,
  inject: { service },
  computed
} = Ember;

export default Route.extend(add, {
  auth: service(),
  ajax: service(),
  modelName: 'employee-issue',

  model () {
    return RSVP.hash({
      issue:      this._super(...arguments),
      issueTypes: this.getIssueTypes(),
      employees:  this.get('employees')
    });
  },

  getModelDefaults () {
    return RSVP.hash({
      creator: this.get('auth.user.employee'),
      employee: this.modelFor('account.employee')
    });
  },

  setupController (controller, model) {
    controller.setProperties({
      model:      model.issue,
      issueTypes: model.issueTypes,
      employees:  model.employees
    });
  },

  getIssueTypes () {
    return this.get('ajax').request('/api/v1/employee-issues', {
      data: {
        _distinct: true,
        select: 'type'
      }
    })
    .then(res => A(issueTypes.concat(res)).uniq());
  },

  employees: computed(function () {
    let $nin = [this.modelFor('account.employee').get('id')],
        user = this.get('auth.user');

    if (user.get('employee.id')) {
      $nin.push(user.get('employee.id'));
    }

    return this.store.query('employee', {
      _id: { $nin }
    });
  })
});
