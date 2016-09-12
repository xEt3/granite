import Ember from 'ember';

const { Route } = Ember;

export default Route.extend({
  model () {
    // TODO: Allow param for filtering/paging
    return this.store.query('activity', {
      limit: 10,
      page: 0,
      sort: {
        created: -1
      }
    });
  }
});
