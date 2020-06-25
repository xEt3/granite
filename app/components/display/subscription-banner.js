import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class DisplaySubscriptionBanner extends Component {
  @service auth
  @service data
  @service subscription

  @action
  updateAttrs () {
    if (this.args.accountLocked) {
      this.args.transitionToSubscription();
    }
  }

  get bannerClass () {
    if (this.subscription.daysLeftInGracePeriod || this.subscription.accountSuspended) {
      return 'subscription-banner--red';
    } else if (this.subscription.isCancelled) {
      return 'subscription-banner--gray';
    } else {
      return 'subscription-banner--hidden';
    }
  }
}
