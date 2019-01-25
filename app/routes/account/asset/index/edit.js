import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import add from 'granite/mixins/route-abstractions/add';

export default Route.extend(add, {
  titleToken: 'Edit Asset',
  modelName:  'asset-item',

  model (params) {
    return RSVP.hash({
      item:   this.store.find('asset-item', params.asset_item_id),
      assest: this.modelFor('account.asset')
    });
  },

  setupController (controller, model) {
    controller.setProperties({
      model: model.item,
      asset: model.asset
    });
  }
});
