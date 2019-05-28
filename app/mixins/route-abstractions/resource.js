import Mixin from '@ember/object/mixin';
import { inject as service } from '@ember/service';

export default Mixin.create({
  ajax: service(),

  // override to change api query url. This can be combined with "resourceReturnsModel" to map data into store models.
  resourceUrl:          null,
  resourceReturnsModel: true,

  queryParams: {
    page:   { refreshModel: true },
    limit:  { refreshModel: true },
    sortBy: { refreshModel: true }
  },

  filter (query, params, filters) {
    filters.forEach(filter => {
      if (params[filter] === undefined || params[filter] === null) {
        return;
      }

      let param = params[filter];

      query[filter] = param === 'none' ? { $not: { $type: 7 } } : param;
    });
  },

  __pushPayload (payload = {}) {
    const modelName = this.get('modelName'),
          extractedPayload = payload[modelName] || [],
          ids = extractedPayload.mapBy('_id');

    // push all records
    this.store.pushPayload(modelName, payload);

    // return mapped back records from ED internals
    return ids.map((id, i) => ({
      record: this.store.peekRecord(modelName, id),
      meta:   extractedPayload[i]
    }));
  },

  async afterModel (model, transition) {
    let { totalRecords, requestedLimit, requestedPage } = this.getProperties('totalRecords', 'requestedLimit', 'requestedPage'),
        maxPages = Math.ceil(totalRecords / requestedLimit);

    if (requestedPage > maxPages && totalRecords > 0) {
      //set page to 1
      let updatedQueryParams = transition.queryParams;
      transition.abort();
      updatedQueryParams.page = 1;
      this.transitionTo(transition.targetName, { queryParams: updatedQueryParams });
    }
  },

  async model (params) {
    let query = {
      page:  params.page - 1 || 0,
      limit: params.limit
    };

    // merge static sort
    if (this.get('sort')) {
      query.sort = this.get('sort');
    }

    // merge dynamic sort
    if (params.sortBy) {
      query.sort[params.sortBy] = params.sortAsc ? 1 : -1;
    }

    // merge static query
    if (this.get('query')) {
      query = Object.assign({}, query, this.get('query'));
    }

    let mutate = this.mutateQuery,
        sorter = this.sortQuery;

    // pass filters off to Mixin#filter
    if (this.get('filters')) {
      this.filter(query, params, this.get('filters'));
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

    let resourceUrl = this.get('resourceUrl');

    if (!resourceUrl) {
      console.log('HIT IF');
      // normal resource request
      let modelRecords = await this.store.query(this.get('modelName'), query);

      this.setProperties({
        totalRecords:   modelRecords.meta.totalRecords,
        requestedLimit: query.limit,
        requestedPage:  query.page + 1
      });

      return modelRecords;
    }

    // CHECK HERE!!
    console.log('DID NOT HIT IF');
    // begin resource url override mode
    let result = await this.ajax.request(resourceUrl, { data: query });

    console.log('result:', result);

    // remap data into ED Models
    return this.get('resourceReturnsModel') ? this.__pushPayload(result) : result;
  }
});
