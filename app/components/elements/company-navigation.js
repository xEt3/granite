import Ember from 'ember';

const { Component, $, inject } = Ember;

export default Component.extend({
  auth: inject.service(),
  tagName: 'nav',
  classNames: [ 'ui menu account__navigation' ],

  actions: {
    toggle () {
      $('.ui.sidebar').sidebar('toggle');
    }
  }
});
