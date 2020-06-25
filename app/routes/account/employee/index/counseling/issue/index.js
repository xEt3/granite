import { GraniteResourceRoute } from 'granite/core/route';

export default class AccountEmployeeCounselingIssueRoute extends GraniteResourceRoute {
  titleToken = 'Issues'
  modelName = 'corrective-action'

  mutateQuery (q) {
    // get the corrective actions where employeeIssue
    // is the issue that we're on
    q.employeeIssue = this.modelFor('account.employee.index.counseling.issue').issue.id;
  }
}
