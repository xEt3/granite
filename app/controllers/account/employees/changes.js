import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';
import addEdit from 'granite/mixins/controller-abstractions/add-edit';

@classic
export default class ChangesController extends Controller.extend(addEdit) {
  @service
  ajax;

  @action
  approveChange(change) {
    if (this.working) {
      return;
    }

    this.ajaxStart();

    this.ajax.post(`/api/v1/change/${change.get('id')}/apply`)
    .then(() => {
      this.ajaxSuccess(`Successfully applied ${change.get('changes.length')} changes for ${change.get('employee.firstName')}.`);
      this.send('refresh');
    })
    .catch(this.ajaxError.bind(this));
  }

  @action
  rejectChange(change) {
    if (this.working) {
      return;
    }

    change.setProperties({
      approved:   false,
      reviewedOn: new Date()
    });

    this.saveModel(change)
    .then(() => {
      this.send('refresh');
    });
  }
}
