import Controller from '@ember/controller';

export default Controller.extend({
  queryParams: ['tag'],
  feedSource: 'all',
  tag: '',

  actions: {
    onNotify ( type, msg ) {
      this.send('notify', type, msg);
    }
  }
});
