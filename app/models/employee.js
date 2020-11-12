import classic from 'ember-classic-decorator';
import { computed } from '@ember/object';
import Model from '@ember-data/model';
import { attr } from '@ember-data/model';
import Validations from './validations/employee';
import { belongsTo } from 'ember-data/relationships';
import { hasMany } from '@ember-data/model';
import { statesIncomeTaxExempt } from 'granite/config/statics';

@classic
export default class Employee extends Model.extend(Validations) {
  // Personal Information
  @computed('firstName', 'lastName', 'middleName', 'suffix', 'suffixName')
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

  @attr('array') eventHistory;

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

  @attr('Boolean') autoOnboarding;

  @attr('date') delayOnboardingResponseDate;

  @belongsTo('form', {
    async:   true,
    inverse: null
  })
  onboardingQuestionForm;

  get ssnMasked () {
    var ssn = this.ssn;
    return ssn ? ssn.replace(/\D/g, '').replace(/(?:\d{5})(\d{4})/, '***-**-$1') : ssn;
  }

  // Company and Position Information
  @attr('date') activatedOn;

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
  }) offboarder;

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

  @attr('boolean', { defaultValue: true }) externalLinkAutomaticSync;

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

  @attr('string') hsaAccount
  @attr('string') hsaRouting
  @attr('string') hsaType

  @hasMany('bank-account', {
    async:   true,
    inverse: null
  }) bankAccounts;

  @attr('string') workersCompensation
  @attr('string') workersCompClass
  @attr('number', { defaultValue: 0 }) federalTaxAllowances
  @attr('number', { defaultValue: 0 }) federalTaxAdditionalWithholding
  @attr('string') federalTaxFilingStatus
  @attr('boolean') federalTaxStep2
  @attr('number') federalTaxStep3
  @attr('number') federalTaxStep4a
  @attr('number') federalTaxStep4b
  @attr('number') federalTaxStep4c

  @attr('string', { defaultValue: 'MT' }) stateTaxName
  @attr('number', { defaultValue: 0 }) stateTaxAllowances
  @attr('number', { defaultValue: 0 })stateTaxAdditionalWithholding
  @attr('string') stateTaxFilingStatus
  @attr('string', { defaultValue: 'MT' }) stateTaxUnemploymentInsurance
  @attr('date') dateOfBirth;
  @attr('date') effectiveOn; // Placeholder for effective dated changes. This field is only here to pass along to the api

  @computed('stateTaxName')
  get stateIncomeTaxExempt () {
    return statesIncomeTaxExempt.includes(this.stateTaxName);
  }
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
