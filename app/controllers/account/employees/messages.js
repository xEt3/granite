import Controller from 'granite/core/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class AccountEmployeesMessagesMessagesController extends Controller {
  @service socket
  @service data

  @action
  async beginThread () {
    let { success, error } = this.data.createStatus();

    const participants = this.messageParticipantTargets,
          allParticipants = participants.concat([ this.user ]);

    try {
      let result = await this.store.query('message-thread', {
        between: {
          $all:  allParticipants.mapBy('id'),
          $size: allParticipants.length
        },
        limit: 1,
        sort:  { created: -1 }
      });

      if (result.length > 0) {
        success(null, true);
        return this.transitionToRoute('account.employees.messages.thread', result.firstObject);
      }

      let pendingThread = await this.store.createRecord('message-thread', { between: allParticipants });

      let thread = await pendingThread.save();

      success(null, true);
      this.transitionToRoute('account.employees.messages.thread', thread.id);

      this.messageParticipantTargets = null;
      this.send('refreshModel');


    } catch (e) {
      error(e);
    }
  }
}
