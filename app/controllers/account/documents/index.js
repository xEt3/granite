import Controller from 'granite/core/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class AccountDocumentsController extends Controller {
  @service auth
  @service data

  queryParams = [ 'page', 'asc', 'sortProp', 'tags', 'extension' ]
  tags = null
  extension = null
  limit = 20
  page = 1
  asc = true
  sortProp = 'created'

  @action
  updateFilter (filter, value) {
    console.log('inside the head honcho', filter, value);
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
