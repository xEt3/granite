import Route from '@ember/routing/route';
import refreshable from 'granite/mixins/refreshable';

export default Route.extend(refreshable, {
  titleToken: 'Changes',

  model () {
    return this.get('store').query('change', {
      reviewedOn: { $not: { $type: 9 } },
      sort: { created: -1 }
    });
  }
});
