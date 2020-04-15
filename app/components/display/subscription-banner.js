import classic from 'ember-classic-decorator';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import Component from '@ember/component';
import ajaxStatus from 'granite/mixins/ajax-status';

@classic
export default class SubscriptionBanner extends Component.extend(ajaxStatus) {
  @service
  auth;

  @service
  subscription;

  didUpdateAttrs() {
    super.didUpdateAttrs(...arguments);

    if (this.accountLocked) {
      this.transitionToSubscription();
    }
  }

  @computed('subscription.{daysLeftInGracePeriod,accountSuspended,isCancelled}')
  get bannerClass() {
    if (this.get('subscription.daysLeftInGracePeriod') || this.get('subscription.accountSuspended')) {
      return 'subscription-banner--red';
    } else if (this.get('subscription.isCancelled')) {
      return 'subscription-banner--gray';
    } else {
      return 'subscription-banner--hidden';
    }
  }
}
