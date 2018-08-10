import Route from '@ember/routing/route';

export default Route.extend({
  model () {
    return this.get('auth.user.company');
  }
});
