import Ember from 'ember';

const { Route } = Ember;

export default Route.extend({
  model (params) {
    return this.store.find('event', params.event_id)
  }
});
