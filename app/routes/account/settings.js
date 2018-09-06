import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import addEdit from 'granite/mixins/controller-abstractions/add-edit';

export default Route.extend(addEdit, {
  auth: service(),
  transitionAfterSave: false,

  model () {
    console.log('auth.user.company:', this.get('auth.user.company'));
    let x = this.get('auth.user.company');
    // console.log('returning model in settings route:', x);
    return x;
  },

  afterModel (model) {
    console.log('model in settings route:', model);
    const firstStepsCompleted = model.get('firstStepsCompleted');

    if (!firstStepsCompleted.includes('settings')) {
      firstStepsCompleted.addObject('settings');
      return model.save();
    }
  }
});
