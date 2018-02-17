import Controller from '@ember/controller';
import { computed } from '@ember/object';
import addEdit from 'granite/mixins/controller-abstractions/add-edit';

export default Controller.extend(addEdit, {
  editing: false,

  customFieldsExist: computed('model.customFields', function () {
    let cf = this.get('model.customFields');
    return cf ? Object.keys(cf).length : 0;
  }),

  hasAnniversaries: computed.or('model.{hireDate,dateOfBirth}'),
  hasDirectContact: computed.or('model.{phone,email}'),
  hasEmergencyContact: computed.or(
    'model.{emergencyContactPhone,emergencyContactNameFirst,emergencyContactNameLast}'
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
