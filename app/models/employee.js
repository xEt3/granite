import Ember from 'ember';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import Validations from './validations/employee';
import { belongsTo, hasMany } from 'ember-data/relationships';

const { computed } = Ember;

export default Model.extend(Validations, {
  // Personal Information
  fullName: computed('firstName', 'lastName', 'middleInitial', 'suffix', function () {
    var n = this.getProperties('firstName', 'lastName', 'middleName', 'suffixName'),
        fullName = '';

    fullName += n.firstName || '';
    fullName += n.middleName ? ' ' + n.middleName : '';
    fullName += n.lastName ? ' ' + n.lastName : '';
    fullName += n.suffixName ? ' ' + n.suffixName : '';

    return fullName.length > 0 ? fullName : undefined;
  }),

  firstName:                 attr('string'),
  middleName:                attr('string'),
  lastName:                  attr('string'),
  suffixName:                attr('string'),

  addressLine1:              attr('string'),
  addressLine2:              attr('string'),
  addressCity:               attr('string'),
  addressState:              attr('string'),
  addressZip:                attr('string'),
  email:                     attr('string'),
  emergencyContactNameFirst: attr('string'),
  emergencyContactNameLast:  attr('string'),
  emergencyContactPhone:     attr('string'),
  picture:                   attr('string'),
  phone:                     attr('string'),
  ssn:                       attr('string'),

  ssnMasked: computed('ssn', function () {
    var ssn = this.get('ssn');
    return ssn ? ssn.replace(/\D/g, '').replace(/(?:\d{5})(\d{4})/, '***-**-$1') : ssn;
  }),

  // Company and Position Information
  hireDate:    attr('date'),
  jobTitle:    attr('string'),
  payRate:     attr('number'),
  exempt:      attr('boolean', { defaultValue: false }),
  payRateType: attr('string', { defaultValue: 'Hourly' }),

  onboarding:         attr('boolean'),
  onboardingStep:     attr('number'),
  onboarder:          belongsTo('company-user', { async: true, inverse: null }),
  onboardingProgress: attr('number'),

  // Termination
  offboarding:             attr('boolean'),
  offboardingStep:         attr('number'),
  offboarder:              belongsTo('company-user', { async: true, inverse: null }),
  offboardingProgress:     attr('number'),
  offboardingDocuments:    hasMany('file', { defaultValue: [] }),
  terminatedOn:            attr('date'),
  terminationReason:       attr('string'),
  eligibleForRehire:       attr('boolean'),
  finalAddressSelfService: attr('boolean', { defaultValue: true }),
  finalAddressLine1:       attr('string'),
  finalAddressLine2:       attr('string'),
  finalAddressCity:        attr('string'),
  finalAddressState:       attr('string'),
  finalAddressZip:         attr('string'),
  finalEmail:              attr('string'),
  finalAddressCollected:   attr('date'),

  company:     belongsTo('company', { async: true, inverse: null }),
  location:    belongsTo('location', { async: true, inverse: null }),
  department:  belongsTo('department', { async: true, inverse: null }),
  supervisor:  belongsTo('employee', { async: true, inverse: null }),
  companyUser: belongsTo('company-user', { async: true, inverse: 'employee' }),
  creator:     belongsTo('company-user', { async: true, inverse: null }),

  dateOfBirth:  attr('date'),
  effectiveOn:  attr('date'), // Placeholder for effective dated changes. This field is only here to pass along to the api
  customFields: attr({ defaultValue: () => {} }),

  created: attr('date', {
    defaultValue () {
      return new Date();
    }
  })
});
