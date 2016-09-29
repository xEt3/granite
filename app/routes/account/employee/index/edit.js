import Ember from 'ember';
import edit from 'granite/mixins/route-abstractions/edit';

const { Route } = Ember;

export default Route.extend(edit, {
  model () {
    return this.modelFor('account.employee');
  }
});
