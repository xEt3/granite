import Ember from 'ember';

const { Controller } = Ember;

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
