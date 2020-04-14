import classic from 'ember-classic-decorator';
import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';
import RSVP from 'rsvp';

@classic
export default class IndexRoute extends Route {
  @service
  rollbar;

  titleToken() {
    return 'Project';
  }

  model() {
    let actionItem = this.modelFor('account.action-item');

    return RSVP.hash({
      actionItem,
      //dependents are other action-items that are
      //waiting on this action item
      dependents: this.store.query('action-item', { prerequisites: { $in: [ actionItem.get('id') ] } })
    });
  }

  setupController(controller, model) {
    controller.setProperties({
      model:      model.actionItem,
      dependents: model.dependents
    });
  }
}
