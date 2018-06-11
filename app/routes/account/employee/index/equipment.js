import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import Object from '@ember/object';

export default Route.extend({
  model () {
    let employee = this.modelFor('account.employee');
    return RSVP.hash({
      employee,
      // assetItems: this.store.query('asset-item', { 'assignments.employee': employee.get('id') }),
      assignableAssets: this.store.query('asset', {}).then(assets => {
        return RSVP.map(assets.toArray(), asset => {
          let itemQuery = { asset: asset.get('id') };

          if ( !asset.get('sharable') ) {
            itemQuery['assignments.0'] = { $exists: false };
          }

          return this.store.query('asset-item', itemQuery)
            .then(stock => Object.create({ asset, stock }));
        });
      }),

      assignedAssets: this.store.query('asset-item', {
        'assignments.employee': employee.get('id')
      }).then(assets => assets.toArray())
    });

  },
  setupController ( controller, model ) {
    controller.setProperties({
      model: model.employee,
      assignableAssets: model.assignableAssets,
      assignedAssets: model.assignedAssets
    });
  },

  actions : {
    refreshModel () {
      this.refresh();
    }
  }
});
