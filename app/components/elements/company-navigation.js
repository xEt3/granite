import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { htmlSafe } from '@ember/string';
import $ from 'jquery';

export default Component.extend({
  auth:       service(),
  tagName:    'nav',
  classNames: [ 'ui menu account__navigation' ],

  logoUrl: computed('auth.user.company.logoUrl', function () {
    // let img = this.get('auth.user.company.logoUrl') || '/assets/images/granite-logo-mountains.png';
    let img = this.get('auth.user.company.logoUrl') || '/assets/images/beta_granite-logo-mountains.png';
    return htmlSafe(`background-image: url('${img}')`);
  }),

  actions: {
    toggle () {
      $('.ui.sidebar').sidebar('toggle');
    },

    logout () {
      this.get('logout')();
    }
  }
});
