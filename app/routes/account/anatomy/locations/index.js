import Ember from 'ember';
import refreshable from 'granite/mixins/refreshable';


const { Route, inject, RSVP } = Ember;

export default Route.extend(refreshable, {
  queryParams: {
    page: { refreshModel: true }
  },

  auth: inject.service(),

  model ( params ) {
    let limit = this.get('controller.limit') || 20,
        page = (params.page || 1) - 1,
        company = this.get('auth.user.company'),
        companyId = company.get('id'),
        locations = this.store.query('location', { 'company': companyId }, { page, limit });

    return RSVP.hash({
      company,
      locations
    });
  },

  setupController ( controller, model ) {
    this._super(...arguments);
    controller.setProperties({
      model: model.locations,
      company: model.company
    });
  }
});
