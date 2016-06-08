import Ember from 'ember';

const { Controller, computed, observer, on, run, $ } = Ember;

export default Controller.extend({
  navTransparent: computed.equal('currentPath', 'index'),

  topLevel: computed('currentPath', function () {
    return this.get('currentPath').indexOf('account') < 0;
  }),

  updateBodyClass: on('init', observer('topLevel', function () {
    run.next(() => {
      $('body')[this.get('topLevel') ? 'removeClass' : 'addClass']('application__in-account');
    });
  }))
});
