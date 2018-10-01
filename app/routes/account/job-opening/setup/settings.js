import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default Route.extend({
  titleToken: 'Settings',

  model () {
    let jobOpening = this.modelFor('account.job-opening');

    return RSVP.hash({
      jobOpening,
      locations: this.store.findAll('location'),
      employees: this.store.query('employee', {
        email:       { $exists: true },
        companyUser: { $exists: true }
      }),
      //either get the default pipeline, or get custom created one
      defaultPipeline: this.store.query('recruiting-pipeline', { 'jobOpenings.0': { $exists: false } })
      .then(results => results ? results.get('firstObject') : results),

      customPipeline: this.store.query('recruiting-pipeline', { jobOpenings: { $in: [ jobOpening.get('id') ] } })
      .then(results => results ? results.get('firstObject') : results)
    });
  },

  setupController (controller, model) {
    controller.setProperties({
      model:           model.jobOpening,
      locations:       model.locations,
      employees:       model.employees,
      defaultPipeline: model.defaultPipeline,
      customPipeline:  model.customPipeline
    });
  }
});
