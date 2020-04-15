import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';
import ajaxStatus from 'granite/mixins/ajax-status';

@classic
export default class MessagesController extends Controller.extend(ajaxStatus) {
  @service
  socket;

  @action
  beginThread() {
    this.ajaxStart();

    const participants = this.messageParticipantTargets,
          allParticipants = participants.concat([ this.user ]);

    this.store.query('message-thread', {
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

      let pendingThread = this.store.createRecord('message-thread', { between: allParticipants });

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
