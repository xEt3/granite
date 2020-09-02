import Controller from 'granite/core/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class AccountEmployeesChangesController extends Controller {
  @service ajax
  @service data

  @action
  async approveChange (change) {
    if (this.working) {
      return;
    }

    let { success, error } = this.data.createStatus();

    try {
      await this.ajax.post(`/api/v1/change/${change.id}/apply`);
      success(`Successfully applied ${change.changes.length} changes for ${change.employee.get('firstName')}.`);
      this.send('refresher');
    } catch (e) {
      error(e);
    }
  }

  @action
  async rejectChange (change) {
    if (this.working) {
      return;
    }

    change.approved =   false;
    change.reviewedOn = new Date();

    await this.data.saveRecord(change);
    this.send('refresher');
  }
}
