import Route from '@ember/routing/route';

export default Route.extend({
  titleToken: 'Company Anatomy',

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
