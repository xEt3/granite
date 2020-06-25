import Controller from 'granite/core/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

const ACTIVITY_PAGE_HARD_LIMIT = 12;

export default class AccountIndexController extends Controller {
  @service data

  queryParams = [ 'tag', 'limit', 'page' ]
  feedSource = 'all'
  tag = ''
  limit = 5
  @tracked tags
  @tracked totalRecords
  @tracked analytics
  @tracked page = 0

  commonActions = [{
    text: 'Add a new employee',
    link: 'account.employees.add.new'
  }, {
    text: 'Start a new recruiting campaign',
    link: 'account.recruiting.index.new'
  }, {
    text: 'Upload a company document',
    link: 'account.documents.new'
  }];

  get disabled () {
    return this.page >= ACTIVITY_PAGE_HARD_LIMIT || this.totalRecords <= this.model.length ? true : false;
  }

  @action
  onNotify (type, msg) {
    this.data.notify(type, msg);
  }

  @action
  loadMoreActivities () {
    this.page = this.page + 1;
  }
}
