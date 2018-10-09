import Route from '@ember/routing/route';

export default Route.extend({
  title (tokens) {
    return tokens.join(' - ') + ' - ' + this.context.title + ' - Granite HR';
  },

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
