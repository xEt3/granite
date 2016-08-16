import Ember from 'ember';
import add from 'granite/mixins/route-abstractions/add';

const { Route, RSVP, inject } = Ember;

export default Route.extend(add,{
  modelName: 'asset-item',
  auth: inject.service(),

  getModelDefaults () {
    return {
      asset: this.modelFor('account.asset'),
      company: this.get('auth.user.company'),
      creator: this.get('auth.user'),
      customFields: {}
    };
  },

  model () {
    let assetStockItem = this._super(...arguments); // args and context

    return RSVP.hash({
      assetStockItem,
      asset: this.modelFor('account.asset')
    });
    /*
    model = {
      assetStockItem: new stock item,
      asset: asset cat
    };
    */
  },

  setupController ( controller, model ) {
    controller.setProperties({
      model: model.assetStockItem,
      asset: model.asset
    });

    /*
      {{model.icon}}
      {{asset.icon}}
     */
  }
});
