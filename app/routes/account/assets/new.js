import Ember from 'ember';
import add from 'granite/mixins/route-abstractions/add';

const { Route, inject } = Ember;

export default Route.extend(add, {
  auth: inject.service(),
  modelName: 'asset',

  getModelDefaults () {
    return {
      creator: this.get('auth.user'),
      company: this.get('auth.user.company')
    };
  }
});
