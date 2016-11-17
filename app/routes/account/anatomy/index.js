import Ember from 'ember';

const { Route } = Ember;

export default Route.extend({
  model () {
    return this.store.query('employee', {
      $or: [{
        supervisor: { $type: 10 }
      }, {
        supervisor: { $exists: false }
      }],
      sort: { created: 1 }
    });
  }
});
