import Route from '@ember/routing/route';
import refreshable from 'granite/mixins/refreshable';

export default Route.extend(refreshable, {
  titleToken: 'Forms',

  model () {
    return this.store.query('form', { name: { $not: { $type: 10 } } });
  }
});
