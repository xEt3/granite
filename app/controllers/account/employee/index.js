import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { inject as controller } from '@ember/controller';
import del from 'granite/mixins/controller-abstractions/delete';
import { inject as service } from '@ember/service';

export default Controller.extend(del, {
  ajax: service(),
  application: controller(),
  transitionAfterSave: 'account.employees',

  onSummary: computed.equal('application.currentPath', 'account.employee.index.index'),

  actions: {
    resend() {
      this.ajaxStart();

      return this.get('ajax').request(`/api/v1/employee/${this.model.id}/resend-activation`)
      .then(() => {
        this.ajaxSuccess('Email sent.');
      })
      .catch(this.ajaxError.bind(this));
    }
  }
});
