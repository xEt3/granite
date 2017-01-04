import Ember from 'ember';
const { Controller, computed } = Ember;

export default Controller.extend({
  campaignSettingsForm: computed(() => [{
    label: 'Send notifications to',
    inputClass: 'search multiple',
    type: 'select',
    path: 'subscribers',
    contentPath: 'controller.employees',
    displayKey: 'fullName',
    parentClass: 'eight wide column'
  }, {
    label: 'Additional emails to send notifications',
    inputClass: 'search multiple',
    inputAttrs: {
      allowAdditions: true
    },
    type: 'select',
    selectText: 'Type and hit enter to add email addresses',
    path: 'emailSubscribers',
    parentClass: 'eight wide column'
  }, {
    label: 'Start date (optional, otherwise immediate)',
    type: 'date',
    path:'startOn',
    parentClass: 'eight wide column'
  }, {
    label: 'End date (optional, otherwise until filled)',
    type: 'date',
    path:'endOn',
    parentClass: 'eight wide column'
  }, {
    label: 'Due on (optional)',
    type: 'date',
    path:'dueOn',
    parentClass: 'sixteen wide column'
  }, {
    label: 'Show internally',
    type: 'checkbox',
    inputClass: 'toggle',
    path: 'availableInternally',
    parentClass: 'eight wide column'
  }, {
    label: 'Number of days to delay outside sources',
    type: 'number',
    inputAttrs: {
      min: 0,
      max: 30,
      step: 1
    },
    path: 'internalDuration',
    parentClass: 'eight wide column',
    displayIf: 'availableInternally'
  }, {
    label: 'Positions to fill',
    type: 'number',
    inputAttrs: {
      min: 1,
      step: 1
    },
    path: 'positions',
    parentClass: 'sixteen wide column'
  }, {
    label: 'Send confirmation email to applicants',
    type: 'checkbox',
    inputClass: 'toggle',
    path: 'sendApplicantConfirmation',
    parentClass: 'sixteen wide column'
  }, {
    label: 'Send job close notice to unrejected applicants',
    type: 'checkbox',
    inputClass: 'toggle',
    path: 'sendCloseNotice',
    parentClass: 'sixteen wide column'
  }, {
    label: 'Add unrejected applicants to talent pool after filled',
    type: 'checkbox',
    inputClass: 'toggle',
    path: 'allocateTalentPool',
    parentClass: 'sixteen wide column'
  }])
});
//
// X Send notifications to? [multi select input list of employees with emails/user]
// Also send notifications to [multi select input (allow additions)]
// Start Date (otherwise now) [date input]
// End Date (otherwise until filled) [date input]
// Due on date (otherwise indefinite) [date input]
// Show internally [checkbox input]
// Show internally first for x days [number input]
// Positions to fill [number input]
//
// Applicants -
// Send confirmation email [checkbox input]
// Send close notice [checkbox input]
// Add unrejected, but not hired, applicants to your talent pool [checkbox input]
