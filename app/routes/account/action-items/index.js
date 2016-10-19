import Ember from 'ember';

const { Route } = Ember;

export default Route.extend({
  model () {
    return this.store.query('action-item', {
      sort: { created: -1, priority: 1 }
    });
  }
});
