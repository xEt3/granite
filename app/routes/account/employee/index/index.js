import Route from '@ember/routing/route';

export default Route.extend({
  titleToken (model) {
    return model.fullName;
  },

  actions: {
    refresh () {
      return true;
    }
  }
});
