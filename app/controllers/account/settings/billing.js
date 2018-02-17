import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
  status: computed('model.status', function () {
    return (this.get('model.status') || '').split('.').pop().toLowerCase();
  }),

  isPastDue: computed.equal('status', 'PastDue')
});
