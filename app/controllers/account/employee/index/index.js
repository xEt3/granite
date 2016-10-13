import Ember from 'ember';
const { computed, Controller } = Ember;
import addEdit from 'granite/mixins/controller-abstractions/add-edit';

export default Controller.extend(addEdit, {

  editing: false,

  hasAnniversaries: computed.or(
    'model.hireDate',
    'model.dateOfBirth'
  ),

  hasDirectContact: computed.or(
    'model.phone',
    'model.email'
  ),

  hasEmergencyContact: computed.or(
    'model.emergencyContactPhone',
    'model.emergencyContactNameFirst',
    'model.emergencyContactNameLast'
  ),

  actions: {
    beginEditing() {
      this.set('editing', true);
    },

    editValue ( key, newValue ) {
      let model = this.get('model');
      model.set(`customFields.${key}`, newValue);
      this.saveModel();
    },

    deleteCustomField ( key ) {
      let model = this.get('model'),
          customFields = model.get('customFields');

      delete customFields[key];

      model.set('customFields', customFields);
      this.saveModel();
    }
  }
});
