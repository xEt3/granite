import Ember from 'ember';

const { Component, inject } = Ember;

export default Component.extend({
  auth: inject.service(),
  tagName: 'nav',
  classNames: [ 'ui menu nav__main' ],
  classNameBindings: [ 'transparent:nav__main-transparent' ]
});
