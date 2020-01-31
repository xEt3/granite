import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import { A } from '@ember/array';
import { inject as service } from '@ember/service';
import add from 'granite/mixins/route-abstractions/add';
import { issueTypes } from 'granite/config/statics';

export default Route.extend(add, {
  titleToken: 'Corrective Action',
  auth:       service(),
  ajax:       service(),
  modelName:  'corrective-action',

  model () {
    return RSVP.hash({
      correctiveAction: this._super(...arguments),
      issueTypes:       this.getIssueTypes()
    });
  },

  getModelDefaults () {
    let employeeIssue = this.modelFor('account.employee.index.counseling.issue').issue;

    return this.getLastSeverity()
    .then(severity => {
      return {
        severity,
        employeeIssue,
        type:     employeeIssue.get('type'),
        creator:  this.get('auth.user.employee'),
        employee: this.modelFor('account.employee')
      };
    });
  },

  setupController (controller, model) {
    controller.setProperties({
      model:      model.correctiveAction,
      issueTypes: model.issueTypes
    });
  },

  getIssueTypes () {
    return this.get('ajax').request('/api/v1/employee-issues', {
      data: {
        _distinct: true,
        select:    'type'
      }
    })
    .then(res => A([ ...issueTypes, ...res ]).uniq());
  },

  getLastSeverity () {
    let employeeIssue =  this.modelFor('account.employee.index.counseling.issue').issue;
    // Query for corrective actions using this issue and get
    // the first, newest action
    return this.store.query('corrective-action', {
      employeeIssue: employeeIssue.get('id'),
      limit:         1,
      sort:          { created: -1 }
    })
    .then(result => {
      // Get the first correctiveAction in the APRA or the employeeIssue
      let targetObject = result.get('firstObject') || employeeIssue;
      return targetObject.get('severity');
    });
  }
});
