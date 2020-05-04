import Route from 'granite/core/route';

export default class AccountImportRoute extends Route {
  model () {
    return this.get('auth.user.company');
  }
}
