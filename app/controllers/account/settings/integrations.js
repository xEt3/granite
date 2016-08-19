import Ember from 'ember';

const { Controller } = Ember;

export default Controller.extend({
  actions: {
    onNotify () {
      this.send.apply(this, [ 'notify', ...arguments ]);
    }
  }
});
