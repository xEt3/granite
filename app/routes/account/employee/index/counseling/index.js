import Ember from 'ember';
import resource from 'granite/mixins/route-abstractions/resource';

const { Route } = Ember;

export default Route.extend(resource, {
  modelName: 'employee-issue',

  mutateQuery (q) {
    q.employee = this.modelFor('account.employee').get('id');
  }
});
