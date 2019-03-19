import Controller from '@ember/controller';
import { computed } from '@ember/object';

const ACTIVITY_PAGE_HARD_LIMIT = 12;

export default Controller.extend({
  queryParams: [ 'tag', 'limit', 'page' ],
  feedSource:  'all',
  tag:         '',
  limit:       5,
  page:        0,

  commonActions: [{
    text: 'Add a new employee',
    link: 'account.employees.add'
  }, {
    text: 'Start a new recruiting campaign',
    link: 'account.recruiting.new'
  }, {
    text: 'Upload a company document',
    link: 'account.documents.new'
  }],

  disabled: computed('totalRecords', 'model', 'page', function () {
    return this.page >= ACTIVITY_PAGE_HARD_LIMIT || this.get('totalRecords') <= this.get('model.length') ? true : false;
  }),

  actions: {
    onNotify (type, msg) {
      this.send('notify', type, msg);
    },

    loadMoreActivities () {
      this.set('page', this.get('page') + 1);
    }
  }
});
