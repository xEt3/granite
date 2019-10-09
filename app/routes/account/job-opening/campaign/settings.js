import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import edit from 'granite/mixins/route-abstractions/edit';
import $ from 'jquery';

export default Route.extend(edit, {
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
  },

  actions: {
    willTransition () {
      $('#modal__add-stage').modal('hide');
    }
  }
});
