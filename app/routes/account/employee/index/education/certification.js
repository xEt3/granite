import Route from '@ember/routing/route';

export default Route.extend({
  async model ({ certification_id }) {
    return this.store.find('certification', certification_id);
  }
});
