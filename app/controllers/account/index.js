import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
  queryParams: ['tag', 'limit', 'page'],
  feedSource: 'all',
  tag: '',
  limit: 10,
  page: 0,

  disabled: computed('totalRecords', 'model', function () {
    return this.get('totalRecords') <= this.get('model.length') ? true : false;
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
