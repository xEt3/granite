import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import { inject as service } from '@ember/service';

export default Route.extend({
  auth: service(),

  queryParams: {
    sortProp: { refreshModel: true },
    asc: { refreshModel: true },
    page: { refreshModel: true }
  },

  beforeModel () {
    let hints = this.get('auth.user.shownHints');

    if ( !hints || !hints.includes('documents') ) {
      return this.transitionTo('account.documents.intro');
    }
  },

  model (params) {
    let limit = this.get('controller.limit') || 20,
        page = (params.page || 1) - 1;

    let documentsQuery = {
      limit,
      page,
      systemUse: { $ne: true },
      url: { $exists: true },
      sort: {}
    };

    documentsQuery.sort[params.sortProp] = params.asc ? -1 : 1;

    return RSVP.hash({
      documents: this.store.query('file', documentsQuery),
      employees: this.store.findAll('employee')
    });
  },

  setupController (controller, model) {
    controller.setProperties({
      model: model.documents,
      employees: model.employees
    });
  }
});
