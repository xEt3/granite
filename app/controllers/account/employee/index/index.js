import Controller from '@ember/controller';
import { computed } from '@ember/object';
import addEdit from 'granite/mixins/controller-abstractions/add-edit';
import { inject as service } from '@ember/service';

export default Controller.extend(addEdit, {
  ajax:    service(),
  editing: false,

  customFieldsExist: computed('model.customFields', function () {
    let cf = this.get('model.customFields');
    return cf ? Object.keys(cf).length : 0;
  }),

  hasAnniversaries:    computed.or('model.{hireDate,dateOfBirth}'),
  hasDirectContact:    computed.or('model.{phone,email}'),
  hasEmergencyContact: computed.or(
    'model.{emergencyContactPhone,emergencyContactNameFirst,emergencyContactNameLast}'
  ),

  onProbation: computed('model.probationUntil', function () {
    return this.get('model.probationUntil') && moment(this.get('model.probationUntil')).isAfter(moment());
  }),

  actions: {
    forceSync () {
      this.ajaxStart();
      this.get('ajax').post(`/api/v1/integrations/${this.get('model.externalLinkService')}/force-sync`, {
        data: {
          modelName: 'employees',
          recordId:  this.get('model.id')
        }
      }).then(mod => {
        this.ajaxSuccess(mod.modifiedProps.length >= 1 ? 'Successfully Synced Record: ' + mod.modifiedProps.length + ' Changes' : 'Successfully Synced Record: No Changes');
        this.send('refresh');
      })
      .catch(this.ajaxError.bind(this));
    },

    beginEditing () {
      this.set('editing', true);
    },

    editValue (key, newValue) {
      let model = this.get('model');
      model.set(`customFields.${key}`, newValue);
      this.saveModel();
    },

    deleteCustomField (key) {
      let model = this.get('model'),
          customFields = model.get('customFields');

      delete customFields[key];

      model.set('customFields', customFields);
      this.saveModel();
    }
  }
});
