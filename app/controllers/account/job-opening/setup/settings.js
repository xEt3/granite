import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { jobTypes } from 'granite/config/statics';

export default Controller.extend({
  jobTypes,

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
  }]),

  jobSettingsForm: computed(() => [{
    label: 'Location',
    inputClass: 'search',
    type: 'select',
    path: 'location',
    contentPath: 'controller.locations',
    displayKey: 'name',
    parentClass: 'eight wide column'
  }, {
    label: 'Job type',
    inputClass: 'search',
    type: 'select',
    path: 'jobType',
    contentPath: 'controller.jobTypes',
    parentClass: 'eight wide column'
  }, {
    label: 'This job has supervisory duties',
    type: 'checkbox',
    inputClass: 'toggle',
    path: 'supervisoryRequirements',
    parentClass: 'sixteen wide column'
  }])
});
