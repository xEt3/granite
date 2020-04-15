import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';
import ajaxStatus from 'granite/mixins/ajax-status';
import pagination from 'granite/mixins/controller-abstractions/pagination';
import addEdit from 'granite/mixins/controller-abstractions/add-edit';

@classic
export default class IndexController extends Controller.extend(ajaxStatus, pagination, addEdit) {
  @service
  auth;

  queryParams = [ 'page', 'asc', 'sortProp', 'tags', 'extension' ];
  tags = null;
  extension = null;
  limit = 20;
  page = 1;
  asc = true;
  sortProp = 'created';
  enableNotify = true;

  @action
  updateFilter (filter, value) {
    this.set(filter, value);
  }

  @action
  resetFilters () {
    this.setProperties({
      tags:      null,
      extension: null
    });
  }
}
