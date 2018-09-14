import Route from '@ember/routing/route';
import resource from 'granite/mixins/route-abstractions/resource';

export default Route.extend(resource, {
  titleToken: 'Counseling',
  modelName:  'employee-issue',

  mutateQuery (q) {
    q.employee = this.modelFor('account.employee').get('id');
  }
});
