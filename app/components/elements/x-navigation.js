import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'nav',
  classNames: [ 'ui menu nav__main' ],
  classNameBindings: [ 'transparent:nav__main-transparent' ]
});
