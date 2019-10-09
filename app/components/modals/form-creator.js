/*
  USAGE

  {{#modals/form-creator
    formType="exit-interview"
    onCreateForm=(action "setForm") as |openFormModal|
  }}
    <a href="#" {{action openFormModal}}>
      Create form
    </a>
  {{/modals/form-creator}}
*/
import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import addEdit from 'granite/mixins/controller-abstractions/add-edit';
import $ from 'jquery';

export default Component.extend(addEdit, {
  auth:  service(),
  store: service(),

  tagName: [ 'span' ],

  afterSave () {
    let form = this.get('form'),
        removeDuplicates = [];

    form.get('elements').forEach(e => {
      if (!e.get('id')) {
        e.destroy();
        removeDuplicates.push(e);
      }
    });
    form.get('elements').removeObjects(removeDuplicates);
  },

  sortGroupClass: computed('showingPreview', function () {
    return `ui middle aligned divided list form-creator__form-elements ${this.get('showingPreview') ? 'form-creator__form-elements--preview' : ''}`;
  }),

  openFormModal: computed('modalId', function () {
    return this.openModal.bind(this);
  }),

  modalId: computed('elementId', function () {
    return `modal__form-creator-${this.get('elementId')}`;
  }),

  openModal (existingForm) {
    const { formType, store } = this;

    this.set('form', existingForm || store.createRecord('form', {
      formType,
      name: `${formType.charAt(0).toUpperCase()}${formType.replace(/-/g, ' ').slice(1)} form`
    }));

    $(`#${this.get('modalId')}`).modal({
      detachable: true,
      closable:   false,
      context:    '.ember-application'
    }).modal('show');
  },

  closeModal () {
    if (this.form.isNew) {
      this.form.deleteRecord();
      this.set('form', null);
    }

    $(`#${this.get('modalId')}`).modal('hide');
  },

  actions: {
    notify (type, msg) {
      if (this.onNotify) {
        this.onNotify(type, msg);
      }
    },

    addFormElement () {
      let formElement = this.store.createRecord('form-element', {});
      this.get('form.elements').pushObject(formElement);
    },

    deleteFormElement (element) {
      this.get('form.elements').removeObject(element);
    },

    reorderElements (elements) {
      this.get('form').set('elements', elements);
    }
  }
});
