import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import ajaxStatus from 'granite/mixins/ajax-status';

export default Controller.extend(ajaxStatus, {
  socket: service(),

  actions: {
    beginThread () {
      this.ajaxStart();

      const participants = this.get('messageParticipantTargets'),
            allParticipants = participants.concat([ this.get('user') ]);

      this.get('store').query('message-thread', {
        between: {
          $all:  allParticipants.mapBy('id'),
          $size: allParticipants.length
        },
        limit: 1,
        sort:  { created: -1 }
      })
      .then(result => {
        if (result.get('length') > 0) {
          this.ajaxSuccess(null, true);
          return this.transitionToRoute('account.employees.messages.thread', result.get('firstObject'));
        }

        let pendingThread = this.get('store').createRecord('message-thread', { between: allParticipants });

        return pendingThread.save().then(thread => {
          this.ajaxSuccess(null, true);
          this.transitionToRoute('account.employees.messages.thread', thread.id);
        });
      })
      .finally(() => {
        this.set('messageParticipantTargets', null);
        this.send('refresh');
      })
      .catch(this.ajaxError.bind(this));
    }
  }
});
