import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  auth:              service(),
  open:              false,
  tagName:           'nav',
  classNames:        [ 'ui menu nav__main', 'menu__container-responsive' ],
  classNameBindings: [ 'transparent:nav__main-transparent' ],

  actions: {
    toggleMenu () {
      this.toggleProperty('open');
    }
  }
});
