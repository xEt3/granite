import { GraniteResourceRoute } from 'granite/core/route';
import { all } from 'rsvp';

export default class AccountEducationWebinarsRoute extends GraniteResourceRoute {
  titleToken = 'Webinars'
  modelName =  'webinar'

  sort = { title: 1 }

  queryParams = {
    page:    { refreshModel: true },
    limit:   { refreshModel: true },
    sortAsc: { refreshModel: true },
    q:       {
      refreshModel: true,
      replace:      true
    }
  }

  async model ({ q }, transition) {
    const qpTransition = transition.from && transition.from.name === transition.to.name;

    const updateCache = {
      __cacheWebinars:       !q && !this.__cacheWebinars,
      __cacheAuthorizations: !qpTransition && !this.__cacheAuthorizations
    };

    const promisesToResolve = [
      !q && this.__cacheWebinars ? this.__cacheWebinars : super.model(...arguments),
      this.__cacheAuthorizations ? this.__cacheAuthorizations : this.store.query('webinar-authorization', { sort: { created: -1 } })
    ];

    const resolved = await all(promisesToResolve),
          cacheKeys = Object.keys(updateCache);

    for (let cacheKey in updateCache) {
      if (!Object.prototype.hasOwnProperty.call(updateCache, cacheKey)) {
        continue;
      }

      if (updateCache[cacheKey]) {
        this[cacheKey] = resolved[cacheKeys.indexOf(cacheKey)];
      }
    }

    return {
      webinars:       resolved[0],
      authorizations: resolved[1]
    };
  }

  mutateQuery (query, params) {
    if (!params.q) {
      return query;
    }

    query.qKey = [ 'title', 'description' ];
    query.q = params.q;
    return query;
  }

  setupController (controller, model) {
    const { webinars, authorizations } = model;

    controller.setProperties({
      webinars,
      authorizations
    });
  }
}
