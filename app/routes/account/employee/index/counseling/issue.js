import Route from '@ember/routing/route';

export default Route.extend({
  model (params) {
    return this.store.find('employee-issue', params.issue_slug.split('_').pop());
  }
});
