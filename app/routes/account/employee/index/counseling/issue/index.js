import Ember from 'ember';
import resource from 'granite/mixins/route-abstractions/resource';

const { Route } = Ember;

export default Route.extend(resource, {
  modelName: 'corrective-action',

  mutateQuery (q) {
    // get the corrective actions where employeeIssue
    // is the issue that we're on
    q.employeeIssue = this.modelFor('account.employee.index.counseling.issue').get('id');
  }
});
