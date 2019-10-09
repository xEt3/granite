import Controller from '@ember/controller';
import { computed, observer } from '@ember/object';
import { run } from '@ember/runloop';
import { on } from '@ember/object/evented';
import { inject as service } from '@ember/service';
import $ from 'jquery';
import ENV from 'granite/config/environment';
import { accountNavigationItems } from 'granite/config/statics';
import fadeRgb from 'granite/utils/fade-rgb';
import { darken, lighten } from 'granite/utils/mul-rgb';
import { htmlSafe } from '@ember/string';

const nonTopLevelRoutes = [
  'account',
  'login',
  'recover',
  'shared'
];

const noNavRoutes = [
  'shared'
];

export default Controller.extend({
  auth:          service(),
  notifications: service('notification-messages'),
  subscription:  service(),

  accountNavigationItems: computed('auth.user.company.exposeBetaModules', function () {
    let showBetas = this.get('auth.user.company.exposeBetaModules');
    return showBetas ? accountNavigationItems : accountNavigationItems.filter(item => !item.beta);
  }),

  navTransparent: computed.equal('currentPath', 'index'),

  topLevel: computed('currentPath', function () {
    const currentPath = this.get('currentPath');
    return currentPath && !nonTopLevelRoutes.find(r => currentPath.indexOf(r) > -1);
  }),

  noNav: computed('currentPath', function () {
    const currentPath = this.get('currentPath');
    return currentPath && noNavRoutes.find(r => currentPath.indexOf(r) > -1);
  }),

  /* eslint-disable-next-line */
  updateBodyClass: on('init', observer('topLevel', function () {
    if (ENV.environment !== 'test') {
      run.scheduleOnce('afterRender', () => {
        $('body')[this.get('topLevel') ? 'removeClass' : 'addClass']('application__in-account');
      });
    }
  })),

  increaseReadability: computed('backdrop', 'currentPath', function () {
    let backdrop = this.backdrop && this.backdrop.toString && this.backdrop.toString();

    if (!backdrop) {
      return false;
    }

    let filterNumbers = /([\d]{2,3})/g,
        backgroundRGB = backdrop.match(filterNumbers),
        [ r, g, b ] = backgroundRGB.map(Number);

    return (r * 299 + g * 587 + b * 114) / 1000 > 123 ? true : false;
  }),

  backdrop: computed('auth.user.company.rgbPalette', 'currentPath', function () {
    if (this.currentPath.indexOf('account.') < 0) {
      return;
    }

    const palette = this.get('auth.user.company.rgbPalette');
    const grad = palette ? `
      linear-gradient(${fadeRgb(lighten(palette[0], 10), 1)}, transparent),
      linear-gradient(80deg, ${fadeRgb(darken(palette[0], 20), 1)}, transparent),
      linear-gradient(-60deg, ${fadeRgb(palette[2], 1)}, transparent)` :
      false;

    return htmlSafe(grad ? `background: ${grad}` : '');
  }),

  /* eslint-disable-next-line */
  transitionAfterExpiration: observer('auth.isExpired', function () {
    if (this.get('auth.isExpired')) {
      $('.ui.modal').modal('hide');
      this.send('logout', true);
    }
  }),

  actions: {
    transitionToSubscription () {
      this.transitionToRoute('account.settings.billing.index');
    },

    authResponse (response) {
      let auth = this.get('auth');

      if (response) {
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
