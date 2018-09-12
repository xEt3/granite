import Route from '@ember/routing/route';

export default Route.extend({
  titleToken: 'Login',

  resetController (controller, isExiting) {
    if (isExiting) {
      controller.set('expired', false);
    }
  },

  actions: {
    willTransition () {
      this.get('controller').set('previousTransition', null);
    }
  }
});
