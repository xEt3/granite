import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
  features: computed(() => ({
    recruiting: [{
      text: 'Automated Job Listings',
      screen: 'screenshot_automated-job-listings.png'
    }, {
      text: 'Applicant Tracking',
      screen: 'screenshot_applicant-tracking.png'
    }, {
      text: 'Pre-screening',
      screen: 'screenshot_pre-screening.png'
    }, {
      text: 'Scheduling',
      screen: 'screenshot_scheduling.png'
    }, {
      text: 'Automated Communications',
      screen: 'screenshot_automated-communications.png'
    }, {
      text: 'Hosted Careers Page',
      screen: 'screenshot_careers-page.png'
    }, {
      text: 'Seamless Onboarding',
      screen: 'screenshot_ats-onboarding.png'
    }],

    counseling: [{
      text: 'Issue Corrective Actions',
      screen: 'screenshot_issue-corrective-actions.png'
    }, {
      text: 'Document Issues',
      screen: 'screenshot_document-issues.jpg'
    }],

    assetManagemnet: [{
      text: 'Organize Assets',
      screen: 'screenshot_organize-assets.png'
    }, {
      text: 'Custom Attributes',
      screen: 'screenshot_custom-attributes.png'
    }, {
      text: 'Offboarding Collection',
      screen: 'screenshot_offboarding-assets.png'
    }],

    humanCapital: [{
      text: 'Quick Access To Information',
      screen: 'screenshot_employee-info.png'
    }, {
      text: 'Easily Offboard/Onboard',
      screen: 'screenshot_offboarding.png'
    }, {
      text: 'Record Custom Fields',
      screen: 'screenshot_custom-fields.png'
    }]
  }))
});
