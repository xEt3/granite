import classic from 'ember-classic-decorator';
import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';
import { hash } from 'rsvp';
import refreshable from 'granite/mixins/refreshable';

@classic
export default class IndexRoute extends Route.extend(refreshable) {
  titleToken = 'Users';

  @service
  auth;

  @service
  ajax;

  queryParams = { page: { refreshModel: true } };

  model(params) {
    let limit = 10,
        page = (params.page || 1) - 1;

    return hash({
      allUsers:     this.ajax.request('/api/v1/company-users', { data: { inactive: { $ne: true } } }),
      limitedUsers: this.store.query('company-user', {
        page,
        limit,
        _id: { $ne: this.get('auth.user.id') }
      })
    });
  }

  setupController(controller, model) {
    controller.setProperties({
      model:    model.limitedUsers,
      allUsers: model.allUsers.companyUser
    });
  }
}
