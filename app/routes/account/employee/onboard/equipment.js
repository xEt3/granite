import Route from 'granite/core/route';
import RSVP from 'rsvp';
import Object from '@ember/object';
import { action } from '@ember/object';
import $ from 'jquery';

export default class AccountEmployeeOnboardEquipmentRoute extends Route {
  title = 'Equipment - Granite HR'

  async model () {
    let employee = this.modelFor('account.employee.onboard');

    let assets = await this.store.query('asset', {});

    let assignableAssets = await RSVP.all(assets.map(async asset => {
      let itemQuery = { asset: asset.id };

      if (!asset.sharable) {
        itemQuery['assignments.0'] = { $exists: false };
      }

      let stock = await this.store.query('asset-item', itemQuery);

      return await Object.create({
        asset,
        stock
      });
    }));

    let assignedAssets = (await this.store.query('asset-item', { 'assignments.employee': employee.id })).toArray();

    let jobSuggestedAssets = await employee.get('jobDescription.assets') ? (await employee.get('jobDescription')).assets.toArray() : [];

    return {
      employee,
      assignableAssets,
      assignedAssets,
      jobSuggestedAssets
    };
  }

  setupController (controller, model) {
    controller.setProperties({
      model:              model.employee,
      assignableAssets:   model.assignableAssets,
      assignedAssets:     model.assignedAssets,
      jobSuggestedAssets: model.jobSuggestedAssets
    });
  }

  @action
  willTransition () {
    $('#modal__new-asset').modal('hide');
  }
}
