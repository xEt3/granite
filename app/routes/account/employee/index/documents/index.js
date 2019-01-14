import Route from '@ember/routing/route';
import resource from 'granite/mixins/route-abstractions/resource';

export default Route.extend(resource, {
  titleToken: 'Documents',
  modelName:  'file-assignment',

  queryParams: {
    visibleToEmployee: { refreshModel: true },
    readOn:            { refreshModel: true },
    signedOn:          { refreshModel: true }
  },

  sort: { created: -1 },

  mutateQuery (query, params) {
    query.employee = this.modelFor('account.employee').get('id');

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
});