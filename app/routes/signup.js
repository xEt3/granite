import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';

@classic
export default class SignupRoute extends Route {
  titleToken = 'Signup';

  model () {
    return this.store.createRecord('company');
  }
}
