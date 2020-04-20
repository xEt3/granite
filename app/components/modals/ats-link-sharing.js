import Modal from '.';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { A } from '@ember/array';

export default class AtsLinkSharingModal extends Modal {
  @service ajax
  @service data

  modalId = 'modal__ats-link-sharing'
  prevEmails = A()

  get publicLink () {
    return this.args.model && this.args.model.publicLink;
  }

  @action
  async sendLink () {
    const sendTo = this.sendTo,
          note = this.linkNote;

    if (!sendTo || sendTo.length < 1) {
      return;
    }

    const { success, error } = this.data.createStatus('linkSharing');
    this.sendingLink = true;

    try {
      await this.ajax.post(`/api/v1/job-application/${this.args.model.id}/send-sharable-link`, {
        data: {
          note,
          emails: sendTo
        }
      });
      success('Successfully sent link.');
      this.prevEmails.addObjects(sendTo);
    } catch (e) {
      error(e);
      return;
    }

    this.sendTo = A();
    this.linkNote = null;
  }

  @action
  async toggleSharedLink () {
    const { success, error } = this.data.createStatus('linkSharing');

    const model = this.args.model;

    try {
      if (this.publicLink) {
        await this.ajax.request(`/api/v1/job-application/${model.id}/destroy-sharable-link`);
        success('Successfully turned off link sharing.');
        this.set('publicLink', null);
        return;
      }

      const response = await this.ajax.request(`/api/v1/job-application/${model.id}/create-sharable-link`);
      this.publicLink = response.link;
      success('Successfully enabled link sharing.');
    } catch (e) {
      error(e);
    } finally {
      model.reload();
    }
  }
}
