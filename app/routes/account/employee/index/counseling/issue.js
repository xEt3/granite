import Ember from 'ember';

const { Route } = Ember;

export default Route.extend({
  model (params) {
    return this.store.find('employee-issue', params.issue_slug.split('_').pop());
  }
});
