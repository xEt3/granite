import Controller from '@ember/controller';
import addEdit from 'granite/mixins/controller-abstractions/add-edit';
import { forms } from 'granite/config/forms/educate-add';

export default Controller.extend(addEdit, {
  renewal:     null,
  currentForm: forms.certificationRenewal,

  actions: {
    async saveRenewal () {
      const { renewal, certification } = this.get('model'),
            renewalId = this.get('renewal');

      if (!renewalId) {
        certification.renewals.addObject(renewal);
      }

      await this.saveModel(certification);

      if (!renewalId) {
        certification.renewals.removeObject(renewal);
      }
    }
  }
});
