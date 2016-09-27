import Ember from 'ember';
import Table from 'ember-light-table';
import humanizeKey from 'granite/utils/humanize-key-name';

const { Component, isEmpty, computed } = Ember;

export default Component.extend({
  page: 1,
  limit: 10,
  dir: 'asc',
  sort: null,
  model: null,
  isLoading: false,
  canLoadMore: true,

  columns: computed(function() {
    return [{
      label: 'Field',
      valuePath: 'path',
      format: val => val ? humanizeKey(val.join('.')) : val
    }, {
      label: 'Previous Value',
      valuePath: 'lhs'
    }, {
      label: 'New Value',
      valuePath: 'rhs'
    }];
  }),

  table: computed('model', function() {
    return new Table(this.get('columns'), this.get('model'), { enableSync: true });
  }),

  fetchRecords() {
    this.set('isLoading', true);
    this.store.query('user', this.getProperties(['page', 'limit', 'sort', 'dir'])).then(records => {
      this.get('model').pushObjects(records.toArray());
      this.set('isLoading', false);
      this.set('canLoadMore', !isEmpty(records));
    });
  },

  actions: {
    onScrolledToBottom() {
      if(this.get('canLoadMore')) {
        this.incrementProperty('page');
        this.fetchRecords();
      }
    },

    onColumnClick(column) {
      if (column.sorted) {
        this.setProperties({
          dir: column.ascending ? 'asc' : 'desc',
          sort: column.get('valuePath'),
          page: 1
        });
        this.get('model').clear();
        this.fetchRecords();
      }
    }
  }
});
