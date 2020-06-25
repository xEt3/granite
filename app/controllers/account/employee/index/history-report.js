import Controller from 'granite/core/controller';
import Table from 'ember-light-table';
import moment from 'moment';
import humanizeKey from 'granite/utils/humanize-key-name';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class AccountEmployeeHistoryReportController extends Controller {
  @tracked limit = 5
  @tracked page =  1
  @tracked isLoading =   false

  queryParams = [ 'field' ]
  field =       []
  creator =     []
  dir =         'asc'
  sort =        null

  columns = [{
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
  }]

  get canLoadMore () {
    return this.page < Math.ceil(this.meta.totalRecords / this.limit);
  }

  get table () {
    return Table.create({
      columns:    this.columns,
      rows:       this.model,
      enableSync: { enableSync: true }
    });
  }

  @action
  onScrolledToBottom () {
    if (this.canLoadMore) {
      this.incrementProperty('page');
      this.send('refreshModel');
    }
  }

  @action
  onColumnClick (column) {
    if (column.sorted) {
      this.setProperties({
        dir:  column.ascending ? 'asc' : 'desc',
        sort: column.valuePath,
        page: 1
      });
    }
  }

  @action
  setReset (val) {
    this.setProperties({
      resetModel: true,
      page:       1
    });

    this.store.unloadAll('history');
    return val;
  }
}
