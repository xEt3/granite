import { GraniteResourceRoute } from 'granite/core/route';

export default class AccountEmployeeDocumentsRoute extends GraniteResourceRoute {
  titleToken = 'Documents'
  modelName = 'file-assignment'

  queryParams = {
    visibleToEmployee: { refreshModel: true },
    readOn:            { refreshModel: true },
    signedOn:          { refreshModel: true }
  }

  sort = { created: -1 }

  mutateQuery (query, params) {
    query.employee = this.modelFor('account.employee').id;

    if (typeof params.visibleToEmployee === 'boolean') {
      query.visibleToEmployee = params.visibleToEmployee;
    }

    [ 'readOn', 'signedOn' ].forEach(param => {
      if (typeof params[param] === 'boolean') {
        if (params[param]) {
          query[param] = { $ne: null };
        } else {
          query[param] = null;
        }
      }
    });
  }
}
