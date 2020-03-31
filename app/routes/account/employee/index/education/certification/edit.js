import Route from 'granite/core/route';

export default class AccountEmployeeEducationCertificateEditRoute extends Route {
  routeType = 'edit'

  model () {
    return this.modelFor('account.employee.index.education.certification');
  }
}
