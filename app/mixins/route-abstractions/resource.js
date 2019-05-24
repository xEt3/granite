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

  async afterModel () {
    // MILDLY STUCK HERE!!
    // trying to get page request to change if the current page has no records
    let controller = this.controllerFor(this.routeName);

    if (controller) {
      console.log('inside if because controller exists:', controller);
      console.log('controller.pages:', controller.pages);
      if (controller.pages) {
        console.log('inside second if because pages exists');
        let { limit, pages, page, model } = controller;
        // console.log(limit, page, pages);
      }
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
      // normal resource request
      return this.store.query(this.get('modelName'), query);
    }

    // begin resource url override mode
    let result = await this.ajax.request(resourceUrl, { data: query });

    // remap data into ED Models
    return this.get('resourceReturnsModel') ? this.__pushPayload(result) : result;
  }
});
