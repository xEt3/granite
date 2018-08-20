import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import ajaxStatus from 'granite/mixins/ajax-status';

export default Component.extend(ajaxStatus, {
  auth: service(),
  subscription: service(),

  didUpdateAttrs () {
    this._super(...arguments);

    if (this.get('accountLocked')) {
      this.get('transitionToSubscription')();
    }
  },

  bannerClass: computed('subscription.{daysLeftInGracePeriod,accountSuspended,isCancelled}', function () {
    if (this.get('subscription.daysLeftInGracePeriod') || this.get('subscription.accountSuspended')) {
      return 'subscription-banner--red';
    } else if (this.get('subscription.isCancelled')) {
      return 'subscription-banner--gray';
    } else {
      return 'subscription-banner--hidden';
    }
  })
});
