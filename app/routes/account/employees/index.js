import Route from '@ember/routing/route';

export default Route.extend({
  queryParams: {
    page: { refreshModel: true }
  },

  model ( params ) {
    let limit = this.get('controller.limit') || 20,
        page = (params.page || 1) - 1;

    return this.store.query('employee', {
      page,
      limit
    });
  }
});
