import Route from '@ember/routing/route';

export default Route.extend({
  model () {

  },

  setupController (controller) {
    controller.setProperties({ employee: this.modelFor('account.employee') });
  }
});
