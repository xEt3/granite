import Controller from 'granite/core/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class AccountEmployeeOffboardAssetsController extends Controller {
  @service data

  @action
  async unassignAsset (asset) {
    let assignment = asset.assignments.findBy('employee.id', this.employee.id);

    if (assignment) {
      const { success, error } = this.data.createStatus();
      asset.assignments.removeObject(assignment);

      try {
        await asset.save();
      } catch (e) {
        error(e);
      }
      success();
      this.send('refreshModel');
    }
  }
}
