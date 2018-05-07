import Controller from '@ember/controller';

export default Controller.extend({
  queryParams: ['tag', 'limit'],
  feedSource: 'all',
  tag: '',
  limit: 10,

  actions: {
    onNotify ( type, msg ) {
      this.send('notify', type, msg);
    },
    loadMoreActivities () {
      this.set('limit', this.get('limit') + 10);
    }
  }
});
