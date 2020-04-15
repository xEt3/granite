import classic from 'ember-classic-decorator';
import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';
import { resolve } from 'rsvp';
import addEdit from 'granite/mixins/controller-abstractions/add-edit';

@classic
export default class SettingsRoute extends Route.extend(addEdit) {
  @service
  auth;

  transitionAfterSave = false;

  model () {
    return resolve(this.get('auth.user')).then(user => user && user.get('company'));
  }

  afterModel (model) {
    const firstStepsCompleted = model.get('firstStepsCompleted');

    if (!firstStepsCompleted.includes('settings')) {
      firstStepsCompleted.addObject('settings');
      return model.save();
    }
  }
}
