import Ember from 'ember';
import authenticated from '../mixins/authenticated';

const { Route, $ } = Ember;

export default Route.extend(authenticated, {
  actions: {
    willTransition () {
      $('.account__sidebar').sidebar('hide');
    }
  }
});
