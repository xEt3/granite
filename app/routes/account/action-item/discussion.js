import Route from 'granite/core/route';

export default class AccountActionItemDiscussionRoute extends Route {
  titleToken = 'Discussion'

  async model () {
    let actionItem = this.modelFor('account.action-item');

    return {
      actionItem,
      comments: await this.store.query('comment', {
        targetId: actionItem.get('id'),
        sort:     { created: -1 }
      })
    };
  }

  setupController (controller, model) {
    controller.setProperties({
      model:      model.comments,
      actionItem: model.actionItem
    });
  }
}
