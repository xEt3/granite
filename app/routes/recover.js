import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';

@classic
export default class RecoverRoute extends Route {
  titleToken = 'Recover Account';

  model (params) {
    return params.recovery_id;
  }
}
