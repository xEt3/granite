import Route from 'granite/core/route';

export default class AccountImportRoute extends Route {
  titleToken = 'Import'

  model () {
    return this.get('auth.user.company');
  }
}
