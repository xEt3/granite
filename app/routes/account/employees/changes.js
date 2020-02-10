import Route from '@ember/routing/route';
import resource from 'granite/mixins/route-abstractions/resource';
import { inject as service } from '@ember/service';

export default Route.extend(resource, {
  titleToken: 'Changes',
  auth:       service(),
  modelName:  'change',

  query: {
    '$report':  'changeList',
    reviewedOn: { $not: { $type: 9 } }
  },

  sort: { created: -1 },

  actions: {
    refresh () {
      return true;
    }
  }
});
