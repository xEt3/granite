import Ember from 'ember';
const { computed, Controller } = Ember;
export default Controller.extend({

  hasEmergencyContact: computed.notEmpty(
    'model.emergencyContactPhone',
    'model.emergencyContactNameFirst',
    'model.emergencyContactNameLast'
  )
});
