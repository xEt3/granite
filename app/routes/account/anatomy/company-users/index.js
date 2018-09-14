import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import refreshable from 'granite/mixins/refreshable';

export default Route.extend(refreshable, {
  titleToken:  'Users',
  auth:        service(),
  queryParams: { page: { refreshModel: true } },

  model (params) {
    let limit = 10,
        page = (params.page || 1) - 1;

    return this.store.query('company-user', {
      page,
      limit,
      _id: { $ne: this.get('auth.user.id') }
    });
  }
});
