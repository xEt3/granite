import Route from 'granite/core/route';

export default class AccountSettingsFormsRoute extends Route {
  titleToken = 'Forms'

  model () {
    return this.store.query('form', { name: { $not: { $type: 10 } } });
  }
}
