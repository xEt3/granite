import { GraniteResourceRoute } from 'granite/core/route';

export default class AccountEmployeeCounselingRoute extends GraniteResourceRoute {
  titleToken = 'Counseling'
  modelName =  'employee-issue'

  mutateQuery (q) {
    q.employee = this.modelFor('account.employee').id;
  }
}
