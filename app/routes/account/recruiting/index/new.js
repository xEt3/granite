import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import add from 'granite/mixins/route-abstractions/add';

export default Route.extend(add, {
  titleToken: 'New Campaign',
  auth:       service(),
  modelName:  'job-opening',

  model () {
    return RSVP.hash({
      jobOpening:      this._super(...arguments),
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
