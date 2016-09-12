import Ember from 'ember';

const { Controller } = Ember;

export default Controller.extend({
  feedSource: 'all',

  actions: {
    onNotify ( type, msg ) {
      this.send('notify', type, msg);
    }
  }
});
