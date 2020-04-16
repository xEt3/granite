import Route from 'granite/core/route';
import { inject as service } from '@ember/service';
import { isEmpty } from '@ember/utils';

export default class AccountDocumentsRoute extends Route {
  @service auth
  @service ajax
  titleToken = 'Documents'

  queryParams = {
    tags:      { refreshModel: true },
    extension: { refreshModel: true },
    sortProp:  { refreshModel: true },
    asc:       { refreshModel: true },
    page:      { refreshModel: true }
  }

  sort =    { created: -1 }
  filters = [
    'tags',
    'extension'
  ]

  async beforeModel () {
    let hints = await this.auth.get('user.shownHints');

    if (!hints || !hints.includes('documents')) {
      return this.transitionTo('account.documents.intro');
    }
  }

  async model (params) {
    let limit = 20,
        page = (params.page || 1) - 1,
        filterModelsCache = this.filterModelsCache;

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

    return {
      documents:    await this.store.query('file', documentsQuery),
      employees:    await this.store.findAll('employee'),
      filterModels: filterModelsCache || {
        tags: await this.ajax.request('/api/v1/files', {
          data: {
            _distinct: true,
            systemUse: false,
            select:    'tags'
          }
        }),
        extension: await this.ajax.request('/api/v1/files', {
          data: {
            _distinct: true,
            systemUse: false,
            select:    'extension'
          }
        })
      }
    };
  }

  setupController (controller, model) {
    this.filterModelsCache = model.filterModels;

    controller.setProperties({
      model:        model.documents,
      employees:    model.employees,
      filterModels: model.filterModels
    });
  }
}
