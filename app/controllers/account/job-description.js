import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';
import addEdit from 'granite/mixins/controller-abstractions/add-edit';
import del from 'granite/mixins/controller-abstractions/delete';

@classic
export default class JobDescriptionController extends Controller.extend(addEdit, del) {
  @service auth;

  transitionAfterDelete = 'account.recruiting.job-descriptions';
  transitionWithModel = false;

  @action
  createCampaign () {
    this.ajaxStart();

    let job = this.model,
        creator = this.get('auth.user.employee'),
        jobOpening = this.store.createRecord('job-opening', {
          job,
          creator,
          name: `${job.get('title')} Recruiting Campaign`
        });

    jobOpening.save()
    .then(record => {
      this.transitionToRoute('account.job-opening.setup', record.get('id'));
    })
    .catch(this.ajaxError.bind(this));
  }
}
