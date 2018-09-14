import Route from '@ember/routing/route';
import refreshable from 'granite/mixins/refreshable';

export default Route.extend(refreshable, {
  model (params) {
    return this.store.find('employee', params.id);
  }
});
