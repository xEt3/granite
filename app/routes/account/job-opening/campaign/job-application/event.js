import Route from '@ember/routing/route';

export default Route.extend({
  model (params) {
    return this.store.find('event', params.event_id);
  }
});
