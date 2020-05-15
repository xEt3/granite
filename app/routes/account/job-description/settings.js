import Route from 'granite/core/route';

export default class SettingsRoute extends Route {
  titleToken = 'Settings';

  model () {
    return this.modelFor('account.recruiting.job-description');
  }
}
