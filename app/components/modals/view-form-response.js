import Modal from '.';
import $ from 'jquery';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class ViewFormResponseModal extends Modal {
modalId = 'modal__view-form-response'

@tracked form
@tracked response

get responses () {
  return this.form && this.form.elements.map(element => {
    return {
      question: element.label,
      response: this.response.get('responses').findBy('step', element.id)
    };
  });
}

@action
openModal (response, form) {
  this.response = response;
  this.form = form;

  this.dispatchSemanticModal();
}

@action
closeModal () {
  if (this.form.isNew) {
    this.form.deleteRecord();
    this.form = null;
  }
  $(`#${this.modalId}`).modal('hide');
}
}
