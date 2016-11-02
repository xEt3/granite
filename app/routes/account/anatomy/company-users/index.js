import Ember from 'ember';
import refreshable from 'granite/mixins/refreshable';

const { Route, inject } = Ember;

export default Route.extend(refreshable, {
  auth: inject.service(),
  queryParams: {
    page: { refreshModel: true }
  },

  model ( params ) {
    let limit = 10,
        page = (params.page || 1) - 1;

    return this.store.query('company-user', {
      page,
      limit,
      _id: { $ne: this.get('auth.user.id') }
    });
  }
});
