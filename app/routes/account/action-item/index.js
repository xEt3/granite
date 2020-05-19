import { inject as service } from '@ember/service';
import Route from 'granite/core/route';

export default class IndexRoute extends Route {
  @service rollbar;

  titleToken () {
    return 'Project';
  }

  async model () {
    let actionItem = await this.modelFor('account.action-item');
    return {
      actionItem,
      //dependents are other action-items that are
      //waiting on this action item
      dependents: await this.store.query('action-item', { prerequisites: { $in: [ actionItem.id ] } })
    };
  }

  setupController (controller, model) {
    controller.setProperties({
      model:      model.actionItem,
      dependents: model.dependents
    });
  }
}
