import Route from '@ember/routing/route';
import resource from 'granite/mixins/route-abstractions/resource';

export default Route.extend(resource, {
  titleToken: 'Issues',
  modelName: 'corrective-action',

  mutateQuery (q) {
    // get the corrective actions where employeeIssue
    // is the issue that we're on
    q.employeeIssue = this.modelFor('account.employee.index.counseling.issue').get('id');
  }
});
