import Ember from 'ember';
import add from 'granite/mixins/route-abstractions/add';

const { inject } = Ember;

export default Ember.Route.extend(add, {
  modelName: 'location',
  auth: inject.service(),

  getModelDefaults () {
    return {
      company: this.get('auth.user.company'),
      creator: this.get('auth.user')
    };
  }
});
