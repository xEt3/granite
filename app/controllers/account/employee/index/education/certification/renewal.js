import Controller from 'granite/core/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { forms } from 'granite/config/forms/educate-add';

export default class AccountEmployeeEducationCertificationRenewalController extends Controller {
  @service data

  renewal = null
  currentForm = forms.certificationRenewal

  @action
  async saveRenewal () {
    const { renewal, certification } = this.model,
          renewalId = this.renewal;

    if (!renewalId) {
      certification.renewals.addObject(renewal);
    }

    await this.data.saveRecord(certification);

    if (!renewalId) {
      certification.renewals.removeObject(renewal);
    }
  }
}
