import Ember from 'ember';
import add from 'granite/mixins/route-abstractions/add';

const { Route, RSVP, computed, inject: { service } } = Ember;

export default Route.extend(add, {
  auth: service(),
  modelName: 'job',

  model () {
    return RSVP.hash({
      job:         this._super(...arguments),
      assets:      this.store.findAll('asset'), // not so cached
      departments: this.get('departments') // cached
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
      model:       model.job,
      assets:      model.assets,
      departments: model.departments
    });
  }
});
