import Route from '@ember/routing/route';
import refreshable from 'granite/mixins/refreshable';

export default Route.extend(refreshable, {
  model () {
    return this.store.query('asset-item', {
      asset: this.paramsFor('account.asset').id
    });
  }
});
