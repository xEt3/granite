import Ember from 'ember';

const { Route } = Ember;

export default Route.extend({
  model () {
    return this.store.query('asset-item', {
      asset: this.paramsFor('account.asset').id
    });
  }
});
