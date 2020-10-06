/*
  USAGE
  <Modals::FormCreator
    @allowMultiple=Boolean
    @formType="exit-interview"
    @onCreateForm={{this.setForm}} as |openFormModal|
  >
    <a href="#" {{on "click" (prevent-default (fn openFormModal null))}}>
      Create form
    </a>
  </Modals::FormCreator>
*/
import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { elementId } from 'granite/core';
import $ from 'jquery';

@elementId
export default class ModalsFormCreatorComponent extends Component {
  @service data
  @service auth
  @service store
  @tracked form

  afterSave () {
    let form = this.form,
        removeDuplicates = [];

    form.elements.forEach(e => {
      if (!e.get('id')) {
        e.destroy();
        removeDuplicates.push(e);
      }
    });
    form.elements.removeObjects(removeDuplicates);
  }

  get sortGroupClass () {
    return `ui middle aligned divided list form-creator__form-elements ${this.showingPreview ? 'form-creator__form-elements--preview' : ''}`;
  }

  get modalId () {
    return `modal__form-creator-${this.elementId}`;
  }

  @action
  openFormModal (existingForm) {
    const { args: { formType }, store, allowMultiple = false } = this;

    this.form = existingForm || store.createRecord('form', {
      formType,
      name: `${formType.charAt(0).toUpperCase()}${formType.replace(/-/g, ' ').slice(1)} form`
    });

    $(`#${this.modalId}`).modal({
      detachable: true,
      closable:   false,
      allowMultiple,
      context:    '.ember-application'
    }).modal('show');
  }

  @action
  closeModal () {
    if (this.form.isNew) {
      this.form.deleteRecord();
      this.form = null;
    }

    $(`#${this.modalId}`).modal('hide');
  }

  @action
  notify (type, msg) {
    if (this.onNotify) {
      this.data.notify(type, msg);
    }
  }

  @action
  addFormElement () {
    let formElement = this.store.createRecord('form-element', {});
    this.form.elements.pushObject(formElement);
  }

  @action
  deleteFormElement (element) {
    this.form.elements.removeObject(element);
  }

  @action
  reorderElements (elements) {
    this.form.elements = elements;
  }
}
