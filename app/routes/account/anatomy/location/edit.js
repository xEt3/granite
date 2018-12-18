import Route from '@ember/routing/route';

export default Route.extend({
  model ({ location_id }) {
    return this.store.find('location', location_id);
  }
});
