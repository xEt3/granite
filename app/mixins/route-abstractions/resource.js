import Mixin from '@ember/object/mixin';

export default Mixin.create({
  queryParams: {
    page: { refreshModel: true },
    limit: { refreshModel: true },
    sortBy: { refreshModel: true }
  },

  model (params) {
    let query = {
      page: params.page - 1 || 0,
      limit: params.limit
    };

    if ( this.get('sort') ) {
      query.sort = this.get('sort');
    }

    if ( params.sortBy ) {
      query.sort[params.sortBy] = params.sortAsc ? 1 : -1;
    }

    if ( this.get('query') ) {
      Object.assign({}, query, this.get('query'));
    }

    let mutate = this.mutateQuery,
        sorter = this.sortQuery;

    if ( mutate && typeof mutate === 'function' ) {
      mutate.call(this, query);
    }

    if ( sorter && typeof sorter === 'function' ) {
      sorter.call(this, query);
    }

    return this.store.query(this.get('modelName'), query);
  }
});
