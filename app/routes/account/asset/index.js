import Ember from 'ember';
import refreshable from 'granite/mixins/refreshable';

const { Route } = Ember;

export default Route.extend(refreshable, {
  model () {
    return this.store.query('asset-item', {
      asset: this.paramsFor('account.asset').id
    });
  }
});
