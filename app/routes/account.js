import Route from '@ember/routing/route';
import authenticated from '../mixins/authenticated';
import $ from 'jquery';

export default Route.extend(authenticated, {
  title (tokens) {
    return tokens.join(' - ') + ' - Granite HR';
  },
  
  actions: {
    willTransition () {
      $('.account__sidebar').sidebar('hide');
    }
  }
});
