import Modal from '.';
import { lists } from 'granite/config/forms/lists';
import { inject as service } from '@ember/service';
import addEdit from 'granite/mixins/controller-abstractions/add-edit';
import $ from 'jquery';

const AddLabelModalComponent = Modal.extend(addEdit, {
  auth:  service(),
  store: service(),

  newLabelForm: lists.labels.elements,
  enableNotify: false,
  currentLabel: null,
  editingLabel: false,
  appLabels:    [],

  resetProperties () {
    this.setProperties({
      currentLabel: null,
      editingLabel: false
    });
  },

  actions: {
    async startAddEditLabel (label) {
      if (!label) {
        //adding new label
        this.set('currentLabel', await this.store.createRecord('label'));
      } else {
        //editing current label
        this.setProperties({
          currentLabel: label,
          editingLabel: true
        });
      }
    },

    async saveNewLabel (label) {
      // LIST DOESNT UPDATE AND SAVE CORRECTLY
      let company = await this.get('auth.user.company'),
          companyLabels = await company.get('labels'),
          applicationLabels = await this.get('model.labels');

      //add label to application's and company's labels
      companyLabels.addObject(label);
      applicationLabels.addObject(label);

      //save company to save company label list, delete extra label
      await this.saveModel(company);
      companyLabels.filterBy('id', null).invoke('destroyRecord');


      //reset properties
      this.resetProperties();
    },

    respond (response) {
      this.get('onResponse')(response);

      if (!response && this.get('currentLabel')) {
        //kill label record if cancelled
        this.get('currentLabel').destroyRecord();
      }

      this.resetProperties();

      $(`#${this.get('modalId')}`).modal('hide');
    }
  }
});

AddLabelModalComponent.reopenClass({ positionalParams: [ 'model' ] });

export default AddLabelModalComponent;

//create new labels that will add to list of company labels, and also to application
//delete labels off of application
//edit labels on application
