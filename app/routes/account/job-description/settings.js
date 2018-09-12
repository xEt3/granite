import Route from '@ember/routing/route';

export default Route.extend({
  titleToken: 'Settings',

  model () {
    return this.modelFor('account.recruiting.job-description');
  }
});
