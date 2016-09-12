import Ember from 'ember';
import addEdit from 'granite/mixins/controller-abstractions/add-edit';

const { inject } = Ember;

export default Ember.Route.extend(addEdit,{
  queryParams: {
    employee: {
      refreshModel: false
    }
  },

  auth: inject.service(),

  model() {
    return this.get('auth.user.company');
  }


});
