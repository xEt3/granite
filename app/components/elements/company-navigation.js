import Component from '@ember/component';
import { inject as service } from '@ember/service';
import $ from 'jquery';

export default Component.extend({
  auth: service(),
  tagName: 'nav',
  classNames: [ 'ui menu account__navigation' ],

  actions: {
    toggle () {
      $('.ui.sidebar').sidebar('toggle');
    },

    logout () {
      this.get('logout')();
    }
  }
});
