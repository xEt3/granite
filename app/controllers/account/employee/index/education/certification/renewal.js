import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import Controller from '@ember/controller';
import addEdit from 'granite/mixins/controller-abstractions/add-edit';
import { forms } from 'granite/config/forms/educate-add';

@classic
export default class RenewalController extends Controller.extend(addEdit) {
  renewal = null;
  currentForm = forms.certificationRenewal;

  @action
  async saveRenewal() {
    const { renewal, certification } = this.model,
          renewalId = this.renewal;

    if (!renewalId) {
      certification.renewals.addObject(renewal);
    }

    await this.saveModel(certification);

    if (!renewalId) {
      certification.renewals.removeObject(renewal);
    }
  }
}
