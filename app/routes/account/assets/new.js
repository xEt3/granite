import Ember from 'ember';
import add from 'granite/mixins/route-abstractions/add';

export default Ember.Route.extend(add, {
  auth: Ember.inject.service(),
  modelName: 'asset',

  getModelDefaults () {
    return {
      creator: this.get('auth.user'),
      company: this.get('auth.user.company')
    };
  }
});
