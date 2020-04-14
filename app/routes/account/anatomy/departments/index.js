import classic from 'ember-classic-decorator';
import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import refreshable from 'granite/mixins/refreshable';

@classic
export default class IndexRoute extends Route.extend(refreshable) {
  titleToken = 'Departments';
  queryParams = { page: { refreshModel: true } };

  @service
  auth;

  model(params) {
    let limit = this.get('controller.limit') || 20,
        page = (params.page || 1) - 1,
        company = this.get('auth.user.company'),
        companyId = company.get('id'),
        departments = this.store.query('department', {
          page,
          limit,
          'company': companyId
        });

    return RSVP.hash({
      company,
      departments
    });
  }

  setupController(controller, model) {
    super.setupController(...arguments);
    controller.setProperties({
      model:   model.departments,
      company: model.company
    });
  }
}
