import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import addEdit from 'granite/mixins/controller-abstractions/add-edit';

export default Route.extend(addEdit, {
  auth: service(),
  transitionAfterSave: false,

  model () {
    return this.get('auth.user.company');
  }
});
