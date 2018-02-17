import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default Route.extend({
  model () {
    let jobOpening = this.modelFor('account.job-opening');

    return RSVP.hash({
      jobOpening,
      job: jobOpening.get('job'),
      automatic: this.store.findAll('applicant-source'),
      manual: this.store.findAll('manual-applicant-source')
    });
  },

  setupController (controller, model) {
    if ( !model.jobOpening.get('description') && !model.jobOpening.get('title') ) {
      model.jobOpening.setProperties({
        description: model.job.get('description'),
        title: model.job.get('title')
      });
    }

    controller.setProperties({
      model: model.jobOpening,
      sources: {
        manual: model.manual,
        automatic: model.automatic
      }
    });
  }
});
