import Ember from 'ember';
import add from 'granite/mixins/route-abstractions/add';

const { Route, RSVP, computed } = Ember;

export default Route.extend(add, {
  modelName: 'job-opening',

  model () {
    return RSVP.hash({
      jobOpening: this._super(...arguments),
      jobDescriptions: this.store.findAll('job')
    });
  },

  departments: computed(function () {
    return this.store.findAll('department');
  }),

  // TODO: Get defaults and set creator to user's employee

  setupController (controller, model) {
    controller.setProperties({
      model:        model.jobOpening,
      descriptions: model.jobDescriptions
    });
  }
});
