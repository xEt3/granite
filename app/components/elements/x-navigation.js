import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  auth: service(),
  tagName: 'nav',
  classNames: [ 'ui menu nav__main' ],
  classNameBindings: [ 'transparent:nav__main-transparent' ]
});
