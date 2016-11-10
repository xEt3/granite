import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    notifyNewEffective() {
      this.send('notify',
      'success',
      'This change has been recorded.  Please give our system a minute to update',
      { clearDuration: 5000 });
      this.send('refresh');
    }
  }
});
