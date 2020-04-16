import Modal from '.';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import $ from 'jquery';

export default class AddNotesModal extends Modal {
  @service store
  @service data

  get modalId () {
    return this.elementId + '-modal';
  }

  @action
  closeModal () {
    $('#' + this.modalId).modal('hide');
  }

  @action
  cancel () {
    this.model.rollbackAttributes();
    this.closeModal();
  }

  @action
  async save () {
    const application = this.model,
          { success, error } = this.data.createStatus();

    try {
      await application.save();

      success('Saved notes');
      this.closeModal();
    } catch (err) {
      error(err);
    }
  }
}
