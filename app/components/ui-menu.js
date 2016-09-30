import Ember from 'ember';

const { Component } = Ember;

export default Component.extend({
  open: false,
  classNames: [ 'menu__container-responsive' ],

  actions: {
    toggleMenu () {
      this.toggleProperty('open');
    }
  }
});
