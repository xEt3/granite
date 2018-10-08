import Route from '@ember/routing/route';

export default Route.extend({
  model (params) {
    return this.store.find('file', params.id);
  },

  setupController (controller, model) {
    controller.setProperties({
      model,
      employees: this.store.findAll('employee')
    });
  }
});
