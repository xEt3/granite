import Route from '@ember/routing/route';
import resource from 'granite/mixins/route-abstractions/resource';

export default Route.extend(resource, {
  titleToken: 'Documents',
  modelName:  'file-assignment',

  sort: { created: -1 },

  mutateQuery (q) {
    q.employee = this.modelFor('account.employee').get('id');
  }

  //HOOK UP FILTERING
});
