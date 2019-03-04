import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import { inject as service } from '@ember/service';

export default Route.extend({
  rollbar: service(),
  titleToken () {
    return 'Action Item';
  },

  model () {
    let actionItem = this.modelFor('account.action-item');

    this.get('rollbar').critical(new Error('I should be an error in action-item/index!'));

    return RSVP.hash({
      actionItem,
      //dependents are other action-items that are
      //waiting on this action item
      dependents: this.store.query('action-item', { prerequisites: { $in: [ actionItem.get('id') ] } })
    });
  },

  setupController (controller, model) {
    controller.setProperties({
      model:      model.actionItem,
      dependents: model.dependents
    });
  }
});
