import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';

@classic
export default class SettingsRoute extends Route {
  titleToken = 'Settings';

  model() {
    return this.modelFor('account.recruiting.job-description');
  }
}
