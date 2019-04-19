import Route from '@ember/routing/route';

export default Route.extend({
  titleToken (model) {
    return model.name;
  },

  async model ({ certification_id }) {
    return this.store.find('certification', certification_id);
  }
});
