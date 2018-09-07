import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { resolve } from 'rsvp';
import addEdit from 'granite/mixins/controller-abstractions/add-edit';

export default Route.extend(addEdit, {
  auth: service(),
  transitionAfterSave: false,

  model () {
    return resolve(this.get('auth.user')).then(user => user && user.get('company'));
  },

  afterModel (model) {
    const firstStepsCompleted = model.get('firstStepsCompleted');

    if (!firstStepsCompleted.includes('settings')) {
      firstStepsCompleted.addObject('settings');
      return model.save();
    }
  }
});
