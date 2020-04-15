import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import routeAbs from './abstractions/routes';

export default class GraniteRoute extends Route {
  @service auth

  __methodForRouteType (methodName) {
    return this.routeType && routeAbs[this.routeType][methodName];
  }

  model () {
    const method = this.__methodForRouteType('model');

    if (method && !this.bypassModelHook) {
      return method.apply(this, arguments);
    }

    return super.model(...arguments);
  }

  @action
  willTransition () {
    const method = this.__methodForRouteType('willTransition');

    if (method) {
      return method.apply(this, arguments);
    }

    if (super.willTransition) {
      return super.willTransition(...arguments);
    }
  }

  @action
  refreshModel () {
    this.refresh();
  }
}

export class GraniteResourceRoute extends GraniteRoute {
  @service ajax

  resourceUrl = null
  resourceReturnsModel = true

  queryParams = {
    page:    { refreshModel: true },
    limit:   { refreshModel: true },
    sortAsc: { refreshModel: true },
    sortBy:  { refreshModel: true }
  }

  filter (query, params, filters) {
    filters.forEach(filter => {
      if (params[filter] === undefined || params[filter] === null) {
        return;
      }

      let param = params[filter];

      query[filter] = param === 'none' ? { $not: { $type: 7 } } : param;
    });
  }

  __pushPayload (payload = {}) {
    const modelName = this.modelName,
          extractedPayload = payload[modelName] || [],
          ids = extractedPayload.mapBy('_id');

    // push all records
    this.store.pushPayload(modelName, payload);

    // return mapped back records from ED internals
    return ids.map((id, i) => ({
      record: this.store.peekRecord(modelName, id),
      meta:   extractedPayload[i]
    }));
  }

  async afterModel (model, transition) {
    let { totalRecords, requestedLimit, requestedPage } = this,
        maxPages = Math.ceil(totalRecords / requestedLimit);

    if (requestedPage > maxPages && totalRecords > 0) {
      //set page to 1
      let updatedQueryParams = transition.queryParams;
      transition.abort();
      updatedQueryParams.page = 1;
      this.transitionTo(transition.targetName, { queryParams: updatedQueryParams });
    }
  }

  async model (params) {
    let query = {
      page:  params.page - 1 || 0,
      limit: params.limit
    };

    // merge static sort
    if (this.sort) {
      query.sort = this.sort;
    }

    // merge dynamic sort
    if (params.sortBy) {
      query.sort = {
        ...(query.sort || {}),
        [params.sortBy]: params.sortAsc ? 1 : -1
      };
    }

    // merge static query
    if (this.query) {
      query = Object.assign({}, query, this.query);
    }

    let mutate = this.mutateQuery,
        sorter = this.sortQuery;

    // pass filters off to Mixin#filter
    if (this.filters) {
      this.filter(query, params, this.filters);
    }
    // allow query mutation
    if (mutate && typeof mutate === 'function') {
      let result = mutate.call(this, query, params);

      if (result && result.then) {
        await result;
      }
    }

    // allow sorting mutation
    if (sorter && typeof sorter === 'function') {
      sorter.call(this, query, params);
    }

    let resourceUrl = this.resourceUrl;

    if (!resourceUrl) {
      // normal resource request
      let modelRecords = await this.store.query(this.modelName, query);

      this.setProperties({
        totalRecords:   modelRecords.meta.totalRecords,
        requestedLimit: query.limit,
        requestedPage:  query.page + 1
      });

      return modelRecords;
    }

    // begin resource url override mode
    let result = await this.ajax.request(resourceUrl, { data: query });

    // remap data into ED Models
    return this.resourceReturnsModel ? this.__pushPayload(result) : result;
  }
}
