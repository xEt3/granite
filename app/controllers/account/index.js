import Controller from '@ember/controller';

export default Controller.extend({
  queryParams: ['tag', 'limit', 'page'],
  feedSource: 'all',
  tag: '',
  limit: 10,
  page: 0,

  actions: {
    onNotify ( type, msg ) {
      this.send('notify', type, msg);
    },
    loadMoreActivities () {
      this.set('page', this.get('page') + 1);
    }
  }
});
