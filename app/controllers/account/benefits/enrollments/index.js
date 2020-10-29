import Controller from 'granite/core/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class EnrollmentsController extends Controller {
  @tracked waiveAll     = null
  @tracked medical      = null
  @tracked other        = null
  @tracked dental       = null
  @tracked vision       = null
  @tracked life         = null
  @tracked showInactive = false

  queryParams = [
    'page',
    'asc',
    'sortProp',
    'showInactive',
    'waiveAll',
    'medical',
    'other',
    'dental',
    'vision',
    'life'
  ]

  limit = 20
  page = 1
  asc = true
  sortProp = 'created'

  sortOptions = [{
    label: 'Pending',
    path:  'pending'
  }, {
    label: 'Signed',
    path:  'signedOn'
  }, {
    label: 'Created Date',
    path:  'created'
  }]

  @action
  updateFilter (filter, value) {
    if (filter !== 'showInactive') {
      this[filter] = value ? filter.charAt(0).toUpperCase() : null;
      return;
    }
    this[filter] = value;
  }

  @action
  resetFilters () {
    this.setProperties({
      showInactive: false,
      waiveAll:     null,
      medical:      null,
      health:       null,
      dental:       null,
      vision:       null,
      life:         null
    });
  }
}
