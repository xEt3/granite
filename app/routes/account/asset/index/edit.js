import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import edit from 'granite/mixins/route-abstractions/edit';

export default Route.extend(edit, {
  titleToken: 'Edit Asset',
  modelName:  'asset-item',
  segmentKey: 'asset_item_id',

  model () {
    return RSVP.hash({
      item:  this._super(...arguments),
      asset: this.modelFor('account.asset')
    });
  },

  setupController (controller, model) {
    controller.setProperties({
      model: model.item,
      asset: model.asset
    });
  }
});
