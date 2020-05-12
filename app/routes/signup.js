import Route from 'granite/core/route';

export default class SignupRoute extends Route {
  titleToken = 'Signup'

  model () {
    return this.store.createRecord('company');
  }
}
