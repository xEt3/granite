import Ember from 'ember';

const { Controller, computed, observer, on, run, $ } = Ember;

export default Controller.extend({
  accountNavigationItems: [{
    icon: 'dashboard',
    title: 'Dashboard',
    link: 'index'
  }, {
    icon: 'check',
    title: 'Action Items',
    link: 'action-items'
  }, {
    icon: 'users',
    title: 'Employees',
    link: 'employees'
  }, {
    icon: 'user add',
    title: 'Recruiting',
    link: 'recruiting'
  }, {
    icon: 'file',
    title: 'Documents',
    link: 'documents'
  }, {
    icon: 'mobile',
    title: 'Company Assets',
    link: 'assets'
  }, {
    icon: 'doctor',
    title: 'Leave Management',
    link: 'index'
  }],

  navTransparent: computed.equal('currentPath', 'index'),

  topLevel: computed('currentPath', function () {
    const currentPath = this.get('currentPath');
    return currentPath.indexOf('account') < 0 && currentPath.indexOf('login') < 0;
  }),

  updateBodyClass: on('init', observer('topLevel', function () {
    run.next(() => {
      $('body')[this.get('topLevel') ? 'removeClass' : 'addClass']('application__in-account');
    });
  }))
});
