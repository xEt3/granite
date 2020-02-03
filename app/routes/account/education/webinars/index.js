import Route from '@ember/routing/route';
import resource from 'granite/mixins/route-abstractions/resource';

export default Route.extend(resource, {
  titleToken: 'Webinars',
  modelName:  'webinar',

  sort: { title: 1 },

  queryParams: {
    page:    { refreshModel: true },
    limit:   { refreshModel: true },
    sortAsc: { refreshModel: true },
    q:       {
      refreshModel: true,
      replace:      true
    }
  },

  async model ({ q }) {
    const webinars = !q && this.webinarsCache ? this.webinarsCache : await this._super(...arguments);

    if (!q) {
      this.webinarsCache = webinars;
    }

    return {
      webinars,
      authorizations: await this.store.query('webinar-authorization', { sort: { created: -1 } })
    };
  },

  mutateQuery (query, params) {
    if (!params.q) {
      return query;
    }

    query.qKey = [ 'title', 'description' ];
    query.q = params.q;
    return query;
  },

  setupController (controller, model) {
    console.log('setting webinars', model.webinars);
    controller.setProperties({
      webinars:       model.webinars,
      authorizations: model.authorizations
    });
  }
});
