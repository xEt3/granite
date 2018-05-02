import Controller from '@ember/controller';
import { computed, observer } from '@ember/object';
import { run } from '@ember/runloop';
import { on } from '@ember/object/evented';
import { inject as service } from '@ember/service';
import $ from 'jquery';
import ENV from 'granite/config/environment';

const nonTopLevelRoutes = [
  'account',
  'login',
  'recover'
];

export default Controller.extend({
  notifications: service('notification-messages'),

  accountNavigationItems: [{
    icon: 'tachometer alternate',
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
  }, {
    icon: 'sitemap',
    title: 'Company Anatomy',
    link: 'anatomy'
  }],

  navTransparent: computed.equal('currentPath', 'index'),

  topLevel: computed('currentPath', function () {
    const currentPath = this.get('currentPath');
    return currentPath && !nonTopLevelRoutes.find(r => currentPath.indexOf(r) > -1);
  }),

  updateBodyClass: on('init', observer('topLevel', function () {
    if ( ENV.environment !== 'test' ) {
      run.scheduleOnce('afterRender', () => {
        $('body')[this.get('topLevel') ? 'removeClass' : 'addClass']('application__in-account');
      });
    }
  })),

  actions: {
    authResponse ( response ) {
      let auth = this.get('auth');

      if ( response ) {
        auth.refreshSession()
        .catch(() => {
          this.send('logout', true);
        });
      } else {
        this.send('logout');
      }
    }
  }
});
