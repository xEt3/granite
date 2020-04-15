import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';

@classic
export default class CorrectiveActionRoute extends Route {
  model (params) {
    return this.store.find('corrective-action', params.action_id);
  }
}
