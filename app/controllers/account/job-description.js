import Controller from 'granite/core/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class AccountJobDescriptionController extends Controller {
  @service auth
  @service data

  deleteOptions = {
    transitionAfterDelete: 'account.recruiting.job-descriptions',
    transitionWithModel:   false
  }

  @action
  async createCampaign () {
    let { success, error } = this.data.createStatus();

    let job = this.model,
        creator = await this.auth.get('user.employee'),
        jobOpening = await this.store.createRecord('job-opening', {
          job,
          creator,
          name: `${job.title} Recruiting Campaign`
        });

    try {
      let record = await jobOpening.save();
      success(null, true);
      this.transitionToRoute('account.job-opening.setup', record.id);
    } catch (e) {
      error(e);
    }
  }
}
