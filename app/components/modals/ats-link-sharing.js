import Modal from '.';
import { inject as service } from '@ember/service';
import { A } from '@ember/array';
import addEdit from 'granite/mixins/controller-abstractions/add-edit';

const LinkSharingModalComponent = Modal.extend(addEdit, {
  ajax:         service(),
  enableNotify: false,
  modalId:      'modal__ats-link-sharing',

  didReceiveAttrs () {
    this.set('prevEmails', A());
  },

  didUpdateAttrs () {
    this.set('publicLink', this.model && this.model.publicLink);
  },

  actions: {
    async sendLink () {
      const sendTo = this.sendTo,
            note = this.linkNote;

      if (!sendTo || sendTo.length < 1) {
        return;
      }

      this.ajaxStart();
      this.set('sendingLink', true);

      try {
        await this.ajax.post(`/api/v1/job-application/${this.model.id}/send-sharable-link`, {
          data: {
            note,
            emails: sendTo
          }
        });
        this.ajaxSuccess('Successfully sent link.');
        this.prevEmails.addObjects(sendTo);
      } catch (e) {
        this.set('sendingLink', false);
        this.ajaxError(e);
        return;
      }

      this.setProperties({
        sendingLink: false,
        sendTo:      A(),
        linkNote:    null
      });
    },

    async toggleSharedLink () {
      this.ajaxStart();

      const model = this.model;

      try {
        if (this.publicLink) {
          await this.ajax.request(`/api/v1/job-application/${model.id}/destroy-sharable-link`);
          this.ajaxSuccess('Successfully turned off link sharing.');
          this.set('publicLink', null);
          return;
        }

        let response = await this.ajax.request(`/api/v1/job-application/${model.id}/create-sharable-link`);
        this.set('publicLink', response.link);
        this.ajaxSuccess('Successfully enabled link sharing.');
      } catch (e) {
        this.ajaxError(e);
      } finally {
        model.reload();
      }
    }
  }
});

LinkSharingModalComponent.reopenClass({ positionalParams: [ 'model' ] });

export default LinkSharingModalComponent;
