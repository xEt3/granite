import Ember from 'ember';
import edit from 'granite/mixins/route-abstractions/edit';
import { issueTypes } from 'granite/config/statics';

const {
  Route,
  RSVP,
  A,
  inject: { service }
} = Ember;

export default Route.extend(edit, {
  auth: service(),
  ajax: service(),
  modelName: 'corrective-action',

  model () {
    return RSVP.hash({
      correctiveAction: this.modelFor('account.employee.index.counseling.issue.corrective-action'),
      issueTypes: this.getIssueTypes()
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
        select: 'type'
      }
    })
    .then(res => A([ ...issueTypes, ...res ]).uniq());
  }
});
