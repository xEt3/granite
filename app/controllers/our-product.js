import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
  features: computed(function () {
    return {
      recruiting: [{
        text:   'Automated Job Listings',
        screen: 'product-screenshots/screenshot_automated-job-listings.png'
      }, {
        text:   'Applicant Tracking',
        screen: 'product-screenshots/screenshot_applicant-tracking.png'
      }, {
        text:   'Pre-screening',
        screen: 'product-screenshots/screenshot_pre-screening.png'
      }, {
        text:   'Scheduling',
        screen: 'product-screenshots/screenshot_scheduling.png'
      }, {
        text:   'Automated Communications',
        screen: 'product-screenshots/screenshot_automated-communications.png'
      }, {
        text:   'Hosted Careers Page',
        screen: 'product-screenshots/screenshot_careers-page.png'
      }, {
        text:   'Seamless Onboarding',
        screen: 'product-screenshots/screenshot_ats-onboarding.png'
      }],

      counseling: [{
        text:   'Issue Corrective Actions',
        screen: 'product-screenshots/screenshot_issue-corrective-actions.png'
      }, {
        text:   'Document Issues',
        screen: 'product-screenshots/screenshot_document-issues.jpg'
      }],

      assetManagement: [{
        text:   'Organize Assets',
        screen: 'product-screenshots/screenshot_organize-assets.png'
      }, {
        text:   'Custom Attributes',
        screen: 'product-screenshots/screenshot_custom-attributes.png'
      }, {
        text:   'Offboarding Collection',
        screen: 'product-screenshots/screenshot_offboarding-assets.png'
      }],

      humanCapital: [{
        text:   'Quick Access To Information',
        screen: 'product-screenshots/screenshot_employee-info.png'
      }, {
        text:   'Easily Offboard/Onboard',
        screen: 'product-screenshots/screenshot_offboarding.png'
      }, {
        text:   'Record Custom Fields',
        screen: 'product-screenshots/screenshot_custom-fields.png'
      }]
    };
  })
});
