import Route from '@ember/routing/route';

export default Route.extend({
  titleToken () {
    return this.context.name;
  },

  model (params) {
    return this.store.find('asset', params.id);
  }
});
