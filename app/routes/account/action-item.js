import Ember from 'ember';

const { Route } = Ember;

export default Route.extend({
  model ( params ) {
    return this.store.queryRecord('action-item', { title: params.slug.replace(/-/g, ' ') });
  }
});
