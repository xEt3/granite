import Ember from 'ember';

const { Route, RSVP } = Ember;

export default Route.extend({
  model () {
    return RSVP.hash({
      jobOpening: this.modelFor('account.job-opening'),
      automatic: this.store.findAll('applicant-source'),
      manual: this.store.findAll('manual-applicant-source')
    });
  },

  setupController (controller, model) {
    controller.setProperties({
      model: model.jobOpening,
      sources: {
        manual: model.manual,
        automatic: model.automatic
      }
    });
  }
});
