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
        between: { $all: allParticipants.mapBy('id') },
        limit: 1,
        sort: {
          created: -1
        }
      })
      .then(result => {
        console.log('result:', result);
        if (result.get('length') > 0) {
          console.log('existing thread, transitioning');
          this.ajaxSuccess(null, true);
          return this.transitionToRoute('account.employees.messages.thread', result.get('firstObject'));
        }

        let pendingThread = this.get('store').createRecord('message-thread', {
          between: allParticipants
        });
        console.log('making thread', pendingThread);

        return pendingThread.save().then(thread => {
          console.log('saved thread', pendingThread);
          this.ajaxSuccess(null, true);
          this.transitionToRoute('account.employees.messages.thread', thread);
        });
      })
      .finally(() => {
        this.set('messageParticipantTargets', null);
      })
      .catch(this.ajaxError.bind(this));
    }
  }
});
