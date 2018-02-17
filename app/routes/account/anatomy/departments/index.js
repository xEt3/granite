import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import { inject as service } from '@ember/service';
import refreshable from 'granite/mixins/refreshable';

export default Route.extend(refreshable, {
  queryParams: {
    page: { refreshModel: true }
  },

  auth: service(),

  model ( params ) {
    let limit = this.get('controller.limit') || 20,
        page = (params.page || 1) - 1,
        company = this.get('auth.user.company'),
        companyId = company.get('id'),
        departments = this.store.query('department', { page, limit, 'company': companyId });

    return RSVP.hash({
      company,
      departments
    });
  },

  setupController ( controller, model ) {
    this._super(...arguments);
    controller.setProperties({
      model: model.departments,
      company: model.company
    });
  }
});
