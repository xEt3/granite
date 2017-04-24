import Ember from 'ember';

const { Route, RSVP: { hash } } = Ember;

export default Route.extend({
  model () {
    const jobOpening = this.modelFor('account.job-opening');

    return hash({
      jobOpening,
      applications: this.store.query('job-application', {
        jobOpening: jobOpening.get('id'),
        sort: { created: 1 }
      })
    });
  }
});
