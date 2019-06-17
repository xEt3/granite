import Component from '@ember/component';
import { lists } from 'granite/config/forms/lists';
import { inject as service } from '@ember/service';
import addEdit from 'granite/mixins/controller-abstractions/add-edit';
import $ from 'jquery';

const AddLabelModalComponent = Component.extend(addEdit, {
  auth:  service(),
  store: service(),

  enableNotify: false,
  currentLabel: null,
  newLabelForm: lists.labels.elements,

  resetCurrentLabel () {
    this.set('currentLabel', null);
  },

  actions: {
    async addLabel () {
      this.set('currentLabel', await this.store.createRecord('label'));
    },

    async saveLabel (label) {
      let company = await this.get('auth.user.company'),
          companyLabels = await company.get('labels'),
          applicationLabels = await this.get('model.labels');

      //add label to company, save, then remove phony label
      companyLabels.addObject(label);
      await this.saveModel(company);
      companyLabels.filterBy('id', null).invoke('destroyRecord');

      //add saved label to application labels array
      let newSavedLabel = companyLabels.find(l => {
        return l.id && l.text === label.text;
      });

      applicationLabels.addObject(newSavedLabel);

      //reset currentLabel so fields are blank to add another label
      this.resetCurrentLabel();
    },

    respond (response) {
      this.get('onResponse')(response);

      if (!response && this.get('currentLabel')) {
        //kill label record if cancelled
        this.get('currentLabel').destroyRecord();
      }

      this.resetCurrentLabel();

      $(`#${this.get('modalId')}`).modal('hide');
    }
  }
});

AddLabelModalComponent.reopenClass({ positionalParams: [ 'model' ] });

export default AddLabelModalComponent;
