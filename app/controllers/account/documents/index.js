import Controller from 'granite/core/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class AccountDocumentsController extends Controller {
  @service auth
  @service data
  @tracked tags = null
  @tracked extension = null

  queryParams = [ 'page', 'asc', 'sortProp', 'tags', 'extension' ]
  limit = 20
  page = 1
  asc = true
  sortProp = 'created'

  @action
  updateFilter (filter, value) {
    this.filter = value;
  }

  @action
  resetFilters () {
    this.setProperties({
      tags:      null,
      extension: null
    });
  }
}
