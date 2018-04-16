import Route from '@ember/routing/route';

export default Route.extend({
  // FILTER REFRESH MODEL TRUE HERE?
  queryParams: {
    page: { refreshModel: true }
  },

  model ( params ) {
    // WILL ADD QUERY HERE
    let limit = this.get('controller.limit') || 20,
        page = (params.page || 1) - 1;

    return this.store.query('employee', {
      page,
      limit
    });
  }
});
