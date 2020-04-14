import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import refreshable from 'granite/mixins/refreshable';
import Object, { action } from '@ember/object';

@classic
export default class EquipmentRoute extends Route.extend(refreshable) {
  titleToken = 'Equipment';

  model() {
    let employee = this.modelFor('account.employee');
    return RSVP.hash({
      employee,
      assignableAssets: this.store.query('asset', {}).then(assets => {
        return RSVP.map(assets.toArray(), asset => {
          let itemQuery = { asset: asset.get('id') };

          if (!asset.get('sharable')) {
            itemQuery['assignments.0'] = { $exists: false };
          }

          return this.store.query('asset-item', itemQuery)
          .then(stock => Object.create({
            asset,
            stock
          }));
        });
      }),

      assignedAssets: this.store.query('asset-item', { 'assignments.employee': employee.get('id') }).then(assets => assets.toArray())
    });

  }

  setupController(controller, model) {
    controller.setProperties({
      model:            model.assignedAssets,
      employee:         model.employee,
      assignableAssets: model.assignableAssets
    });
  }

  @action
  willTransition() {
    let modalNode = document.querySelector('.ui.modal.new-asset');

    if (modalNode && modalNode.remove) {
      modalNode.remove();
    }
  }
}
