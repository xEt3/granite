import Route from '@ember/routing/route';
import resource from 'granite/mixins/route-abstractions/resource';

export default Route.extend(resource, {
  titleToken: 'Webinars',
  modelName:  'webinar',

  queryParams: {
    page:    { refreshModel: true },
    limit:   { refreshModel: true },
    sortAsc: { refreshModel: true }
  },

  async model () {
    return {
      webinars:       await this._super(...arguments),
      authorizations: await this.store.query('webinar-authorization', { sort: { created: -1 } })
    };
  },

  setupController (controller, model) {
    controller.setProperties({
      webinars:       model.webinars,
      authorizations: model.authorizations
    });
  }
});
