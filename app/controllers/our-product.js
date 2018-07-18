import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
  features: computed(() => ({
    recruiting: [{
      text: 'Automated Job Listings',
      screen: 'product-screenshots/automated-job-listings.png'
    }, {
      text: 'Applicant Tracking',
      screen: 'product-screenshots/applicant-tracking.png'
    }, {
      text: 'Pre-screening',
      screen: 'product-screenshots/pre-screening.png'
    }, {
      text: 'Scheduling',
      screen: 'product-screenshots/scheduling.png'
    }, {
      text: 'Automated Communications',
      screen: 'product-screenshots/automated-communications.png'
    }, {
      text: 'Hosted Careers Page',
      screen: 'product-screenshots/careers-page.png'
    }, {
      text: 'Seamless Onboarding',
      screen: 'product-screenshots/ats-onboarding.png'
    }],

    counseling: [{
      text: 'Issue Corrective Actions',
      screen: 'product-screenshots/issue-corrective-actions.png'
    }, {
      text: 'Document Issues',
      screen: 'product-screenshots/document-issues.jpg'
    }]
  }))
});
