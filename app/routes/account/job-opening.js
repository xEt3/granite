import Route from '@ember/routing/route';

export default Route.extend({
  titleToken (model) {
    return model.get('title');
  },

  model (params) {
    return this.store.find('job-opening', params.id);
  }
});
