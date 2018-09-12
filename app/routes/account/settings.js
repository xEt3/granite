import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import addEdit from 'granite/mixins/controller-abstractions/add-edit';

export default Route.extend(addEdit, {
  auth:                service(),
  transitionAfterSave: false,

  model () {
    return this.get('auth.user.company');
  },

  afterModel (model) {
    const firstStepsCompleted = model.get('firstStepsCompleted');

    if (!firstStepsCompleted.includes('settings')) {
      firstStepsCompleted.addObject('settings');
      return model.save();
    }
  }
});
