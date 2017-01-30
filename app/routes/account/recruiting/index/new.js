import Ember from 'ember';
import add from 'granite/mixins/route-abstractions/add';

const { Route, RSVP, computed, inject: { service } } = Ember;

export default Route.extend(add, {
  auth: service(),
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

  getModelDefaults () {
    return { creator: this.get('auth.user.employee') };
  },

  setupController (controller, model) {
    controller.setProperties({
      model:        model.jobOpening,
      descriptions: model.jobDescriptions
    });
  }
});
