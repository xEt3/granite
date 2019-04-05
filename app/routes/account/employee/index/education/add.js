import Route from '@ember/routing/route';

export default Route.extend({
  model () {

  },

  setupController (controller, model) {
    controller.setProperties({ employee: this.modelFor('account.employee') });
  }
});
