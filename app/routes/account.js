import Ember from 'ember';

const { Route, $ } = Ember;

export default Route.extend({
  actions: {
    willTransition () {
      $('.account__sidebar').sidebar('hide');
    }
  }
});
