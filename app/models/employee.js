import classic from 'ember-classic-decorator';
import { computed } from '@ember/object';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import Validations from './validations/employee';
import { belongsTo, hasMany } from 'ember-data/relationships';

@classic
export default class Employee extends Model.extend(Validations) {
  // Personal Information
  @computed('firstName', 'lastName', 'middleName', 'suffix')
  get fullName () {
    var n = this.getProperties('firstName', 'lastName', 'middleName', 'suffixName'),
        fullName = '';

    fullName += n.firstName || '';
    fullName += n.middleName ? ' ' + n.middleName : '';
    fullName += n.lastName ? ' ' + n.lastName : '';
    fullName += n.suffixName ? ' ' + n.suffixName : '';

    return fullName.length > 0 ? fullName : undefined;
  }

  @attr('string') firstName;

  @attr('string') middleName;

  @attr('string') lastName;

  @attr('string') suffixName;

  @attr('string') gender;

  @attr('string') addressLine1;

  @attr('string') addressLine2;

  @attr('string') addressCity;

  @attr('string') addressState;

  @attr('string') addressZip;

  @attr('string') email;

  @attr('string') privateEmail;

  @attr('string') emergencyContactNameFirst;

  @attr('string') emergencyContactNameLast;

  @attr('string') emergencyContactPhone;

  @attr('string') picture;

  @attr('string') phone;

  @attr('string') ssn;

  @attr('string') workersCompClassCode;

  @attr('string') employeeNumber;

  @computed('ssn')
  get ssnMasked () {
    var ssn = this.ssn;
    return ssn ? ssn.replace(/\D/g, '').replace(/(?:\d{5})(\d{4})/, '***-**-$1') : ssn;
  }

  // Company and Position Information
  @attr('date') activatedOn;

  @attr('number') minimumHours;

  @attr('date') hireDate;

  @attr('string') jobTitle;

  @attr('number') payRate;

  @attr('boolean', { defaultValue: false }) exempt;

  @attr('string', { defaultValue: 'hourly' }) payRateType;

  @attr('string') eeoJobCategory;

  @attr('date') probationUntil;

  @attr('boolean') onboarding;

  @attr('number') onboardingStep;

  @belongsTo('company-user', {
    async:   true,
    inverse: null
  })
  onboarder;

  @attr('number') onboardingProgress;

  // Termination
  @attr('boolean') offboarding;

  @attr('number') offboardingStep;

  @belongsTo('company-user', {
    async:   true,
    inverse: null
  })
  offboarder;

  @attr('number') offboardingProgress;

  @attr('date') offboardingCompleted;

  @hasMany('file', { defaultValue: [] }) offboardingDocuments;

  @attr('date') terminatedOn;

  @attr('string') terminationReason;

  @attr('boolean') eligibleForRehire;

  @attr('boolean', { defaultValue: true }) finalAddressSelfService;

  @attr('string') finalAddressLine1;

  @attr('string') finalAddressLine2;

  @attr('string') finalAddressCity;

  @attr('string') finalAddressState;

  @attr('string') finalAddressZip;

  @attr('string') finalEmail;

  @attr('date') finalAddressCollected;

  @attr('string') externalLinkService;

  @attr('string') externalLinkId;

  @attr('string') externalLinkDocumentLink;

  @attr('boolean') externalLinkAutomaticSync;

  @attr('date') externalLinkLastSync;

  // Auto exit interview
  @attr('boolean') autoExitInterview;

  @attr('date') autoExitInterviewDate;

  @belongsTo('form', {
    async:   true,
    inverse: null
  })
  autoExitInterviewForm;

  // Auto I9 collection
  @attr('boolean') autoI9Collection;

  @attr('boolean') autoW4Collection;

  @belongsTo('company', {
    async:   true,
    inverse: null
  })
  company;

  @belongsTo('location', {
    async:   true,
    inverse: null
  })
  location;

  @belongsTo('department', {
    async:   true,
    inverse: null
  })
  department;

  @belongsTo('employee', {
    async:   true,
    inverse: null
  })
  supervisor;

  @belongsTo('company-user', {
    async:   true,
    inverse: 'employee'
  })
  companyUser;

  @belongsTo('job', {
    async:   true,
    inverse: null
  })
  jobDescription;

  @belongsTo('job-application', {
    async:   true,
    inverse: null
  })
  hiredFromJobApp;

  @belongsTo('company-user', {
    async:   true,
    inverse: null
  })
  creator;

  @attr('number') contributionsEmployeeAmount
  @attr('string') contributionsEmployeeType

  @attr('number') contributionsSpouseAmount
  @attr('string') contributionsSpouseType

  @attr('number') contributionsChildrenAmount
  @attr('string') contributionsChildrenType

  @attr('number') contributionsFamilyAmount
  @attr('string') contributionsFamilyType

  @attr('boolean') wellnessPlan

  @attr('date') dateOfBirth;

  @attr('date') effectiveOn; // Placeholder for effective dated changes. This field is only here to pass along to the api

  @attr({ defaultValue: () => {} }) customFields;

  @attr('string') separationNotes;

  @computed('probationUntil')
  get onProbation () {
    return this.probationUntil && moment(this.probationUntil).isAfter(moment());
  }

  @attr('date', {
    defaultValue () {
      return new Date();
    }
  })
  created;
}
