import classic from 'ember-classic-decorator';
import { action, computed } from '@ember/object';
import Controller from '@ember/controller';

const ACTIVITY_PAGE_HARD_LIMIT = 12;

@classic
export default class IndexController extends Controller {
  queryParams = [ 'tag', 'limit', 'page' ];
  feedSource = 'all';
  tag = '';
  limit = 5;
  page = 0;

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

  @computed('totalRecords', 'model', 'page')
  get disabled() {
    return this.page >= ACTIVITY_PAGE_HARD_LIMIT || this.get('totalRecords') <= this.get('model.length') ? true : false;
  }

  @action
  onNotify(type, msg) {
    this.send('notify', type, msg);
  }

  @action
  loadMoreActivities() {
    this.set('page', this.get('page') + 1);
  }
}
