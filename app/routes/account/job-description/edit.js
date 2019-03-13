import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import edit from 'granite/mixins/route-abstractions/edit';

export default Route.extend(edit, {
  titleToken:      'Edit Description',
  auth:            service(),
  bypassModelHook: true,


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