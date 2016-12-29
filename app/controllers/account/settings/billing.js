import Ember from 'ember';

const { Controller, computed } = Ember;

export default Controller.extend({
  status: computed('model.status', function () {
    return (this.get('model.status') || '').split('.').pop().toLowerCase();
  }),

  isPastDue: computed.equal('status', 'PastDue')
});
