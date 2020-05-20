import { GraniteResourceController } from 'granite/core/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class AccountEmployeeDocumentsController extends GraniteResourceController {
  @tracked visibleToEmployee = null
  @tracked readOn = null
  @tracked signedOn = null

  showFilters = false
  queryParams = [
    'showFilters',
    { visibleToEmployee: { type: 'boolean' } },
    { readOn: { type: 'boolean' } },
    { signedOn: { type: 'boolean' } }
  ]

  @action
  updateFilter (filter, value) {
    this[filter] = value;
  }

  @action
  resetFilters () {
    this.visibleToEmployee = null;
    this.readOn = null;
    this.signedOn = null;
  }
}
