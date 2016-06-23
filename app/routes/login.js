import Ember from 'ember';

const { Route } = Ember;

export default Route.extend({
  actions: {
    willTransition () {
      this.get('controller').set('previousTransition', null);
    }
  }
});
