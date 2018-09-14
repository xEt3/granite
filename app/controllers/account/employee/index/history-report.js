import Controller from '@ember/controller';
import { computed } from '@ember/object';
import Table from 'ember-light-table';
import moment from 'moment';
import humanizeKey from 'granite/utils/humanize-key-name';

export default Controller.extend({
  queryParams: [ 'sort', 'field' ],
  page:        1,
  limit:       5,
  dir:         'asc',
  sort:        null,
  model:       null,
  isLoading:   false,
  field:       [],
  creator:     [],

  canLoadMore: computed('meta.totalRecords', 'limit', function () {
    return this.get('page') < Math.ceil(this.get('meta.totalRecords') / this.get('limit'));
  }),

  columns: computed(() => {
    return [{
      label:     'Field',
      valuePath: 'diff.path',
      format:    val => val ? humanizeKey(val.join('.')) : val,
      sortable:  false
    }, {
      label:         'Previous Value',
      valuePath:     'diff.lhs',
      sortable:      false,
      cellComponent: 'tables/cells/diff-value'
    }, {
      label:         'New Value',
      valuePath:     'diff.rhs',
      sortable:      false,
      cellComponent: 'tables/cells/diff-value'
    }, {
      label:     'Changed On',
      valuePath: 'history.created',
      format:    val => val ? moment(val).format('M/D/YY [at] h:mma') : val
    }, {
      label:     'Creator',
      valuePath: 'history.creator.fullName'
    }, {
      label:         'Applied',
      valuePath:     'history.applied',
      cellComponent: 'tables/cells/boolean-check-value'
    }];
  }),

  table: computed('model', function () {
    return new Table(this.get('columns'), this.get('model'), { enableSync: true });
  }),

  actions: {
    onScrolledToBottom () {
      if (this.get('canLoadMore')) {
        this.incrementProperty('page');
        this.send('refresh');
      }
    },

    onColumnClick (column) {
      if (column.sorted) {
        this.setProperties({
          dir:  column.ascending ? 'asc' : 'desc',
          sort: column.get('valuePath'),
          page: 1
        });
      }
    },

    setReset (val) {
      this.setProperties({
        resetModel: true,
        page:       1
      });

      this.store.unloadAll('history');
      return val;
    }
  }
});
