import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import { hash } from 'rsvp';
import { inject as service } from '@ember/service';
import { isEmpty } from '@ember/utils';


export default Route.extend({
  titleToken: 'Documents',
  auth:       service(),
  ajax:       service(),

  queryParams: {
    tags:      { refreshModel: true },
    extension: { refreshModel: true },
    sortProp:  { refreshModel: true },
    asc:       { refreshModel: true },
    page:      { refreshModel: true }
  },

  sort: { created: -1 },


  filters: [
    'tags',
    'extension'
  ],


  beforeModel () {
    let hints = this.get('auth.user.shownHints');

    if (!hints || !hints.includes('documents')) {
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
      url:       { $exists: true },
      sort:      {}
    };

    if (!isEmpty(params.tags)) {
      documentsQuery.tags = { $in: params.tags.split(',') };
    }

    if (!isEmpty(params.extension)) {
      documentsQuery.extension = { $in: params.extension };
    }

    documentsQuery.sort[params.sortProp] = params.asc ? -1 : 1;

    return RSVP.hash({
      documents:    this.store.query('file', documentsQuery),
      employees:    this.store.findAll('employee'),
      filterModels: hash({
        tags: this.get('ajax').request('/api/v1/files', {
          data: {
            _distinct: true,
            systemUse: false,
            select:    'tags'
          }
        }),
        extension: this.get('ajax').request('/api/v1/files', {
          data: {
            _distinct: true,
            systemUse: false,
            select:    'extension'
          }
        })
      })
    });
  },

  setupController (controller, model) {
    controller.setProperties({
      model:        model.documents,
      employees:    model.employees,
      filterModels: model.filterModels
    });
  }
});
