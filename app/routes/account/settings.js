import Ember from 'ember';
import addEdit from 'granite/mixins/controller-abstractions/add-edit';

const { Route, inject: { service } } = Ember;

export default Route.extend(addEdit, {
  auth: service(),
  transitionAfterSave: false,

  model () {
    return this.get('auth.user.company');
  }
});
