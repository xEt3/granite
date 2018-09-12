import Mixin from '@ember/object/mixin';

export default Mixin.create({
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

  model (params) {
    let query = {
      page:  params.page - 1 || 0,
      limit: params.limit
    };

    if (this.get('sort')) {
      query.sort = this.get('sort');
    }

    if (params.sortBy) {
      query.sort[params.sortBy] = params.sortAsc ? 1 : -1;
    }

    if (this.get('query')) {
      Object.assign({}, query, this.get('query'));
    }

    let mutate = this.mutateQuery,
        sorter = this.sortQuery;

    if (this.get('filters')) {
      this.filter(query, params, this.get('filters'));
    }

    if (mutate && typeof mutate === 'function') {
      mutate.call(this, query, params);
    }

    if (sorter && typeof sorter === 'function') {
      sorter.call(this, query, params);
    }

    return this.store.query(this.get('modelName'), query);
  }
});
