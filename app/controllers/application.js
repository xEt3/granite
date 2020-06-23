import Controller from 'granite/core/controller';
import { computed, action } from '@ember/object';
import { run } from '@ember/runloop';
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

export default class ApplicationController extends Controller {
  @service auth
  @service('notification-messages') notifications
  @service subscription

  constructor () {
    super(...arguments);
    this.updateBodyClass();
  }

  get accountNavigationItems () {
    let showBetas = this.auth.get('user.company.exposeBetaModules');
    return showBetas ? accountNavigationItems : accountNavigationItems.filter(item => !item.beta);
  }

  @computed.equal('currentPath', 'index') navTransparent

  get topLevel () {
    const currentPath = this.currentPath;
    return currentPath && !nonTopLevelRoutes.find(r => currentPath.indexOf(r) > -1);
  }

  get noNav () {
    const currentPath = this.currentPath;
    return currentPath && noNavRoutes.find(r => currentPath.indexOf(r) > -1);
  }

  @action
  updateBodyClass () {
    if (ENV.environment !== 'test') {
      run.scheduleOnce('afterRender', () => {
        $('body')[this.topLevel ? 'removeClass' : 'addClass']('application__in-account');
      });
    }
  }

  get increaseReadability () {
    let backdrop = this.backdrop && this.backdrop.toString && this.backdrop.toString();

    if (!backdrop) {
      return false;
    }

    let filterNumbers = /([\d]{2,3})/g,
        backgroundRGB = backdrop.match(filterNumbers),
        [ r, g, b ] = backgroundRGB.map(Number);

    return (r * 299 + g * 587 + b * 114) / 1000 > 123 ? true : false;
  }

  get backdrop () {
    if (this.currentPath.indexOf('account.') < 0) {
      return undefined;
    }

    const palette = this.auth.get('user.company.rgbPalette');
    const grad = palette ? `
      linear-gradient(${fadeRgb(lighten(palette[0], 10), 1)}, transparent),
      linear-gradient(80deg, ${fadeRgb(darken(palette[0], 20), 1)}, transparent),
      linear-gradient(-60deg, ${fadeRgb(palette[2], 1)}, transparent)` :
      false;

    return htmlSafe(grad ? `background: ${grad}` : '');
  }

  @action
  transitionAfterExpiration () {
    if (this.auth.get('isExpired')) {
      $('.ui.modal').modal('hide');
      this.send('logout', true);
    }
  }

  @action
  transitionToSubscription () {
    this.transitionToRoute('account.settings.billing.index');
  }

  @action
  authResponse (response) {
    let auth = this.auth;

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
