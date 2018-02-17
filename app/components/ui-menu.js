import Component from '@ember/component';

export default Component.extend({
  open: false,
  classNames: [ 'menu__container-responsive' ],

  actions: {
    toggleMenu () {
      this.toggleProperty('open');
    }
  }
});
