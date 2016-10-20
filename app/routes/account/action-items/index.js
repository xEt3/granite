import Ember from 'ember';

const { Route } = Ember;

export default Route.extend({
  model () {
    return this.store.query('action-item', {
      sort: { priority: -1, created: -1 }
    });
  }
});
