import Ember from 'ember';
const { computed, Controller } = Ember;
export default Controller.extend({


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
  )
});
