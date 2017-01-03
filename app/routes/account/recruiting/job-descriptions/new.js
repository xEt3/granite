import Ember from 'ember';
import add from 'granite/mixins/route-abstractions/add';

const { Route, RSVP, computed } = Ember;

export default Route.extend(add, {
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

  // TODO: Get defaults and set creator to user's employee

  setupController (controller, model) {
    controller.setProperties({
      model:       model.job,
      assets:      model.assets,
      departments: model.departments
    });
  }
});
