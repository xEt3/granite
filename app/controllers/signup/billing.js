import Controller from 'granite/core/controller';
import { computed, action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class SignupBillingController extends Controller {
  @service ajax
  @service data

  @tracked applyingPromo

  @computed.and('applyingPromo', 'working') loadingPromo

  get savingStep () {
    return !this.applyingPromo && this.working;
  }

  get working () {
    return this.data.statuses.working ? this.data.statuses.working.isLoading : false;
  }

  @action
  async verifyDiscount () {
    const code = this.promoCode;

    if (!code) {
      return;
    }

    this.applyingPromo = true;
    let { success, error } = this.data.createStatus();

    try {
      var validity = await this.ajax.request('/api/v1/bt/discount', { data: { code } });
    } catch (e) {
      return error(e, true);
    }

    if (!validity.code) {
      this.analytics.trackEvent('Signup', 'promo_invalid', code);
      return error('Unable to apply discount.', true);
    }

    this.analytics.trackEvent('Signup', 'promo_applied', validity.code);

    this.model.set.accountBillingPromo = validity.code;
    this.appliedPromo = validity;

    success(null, true);
  }

  @action
  async submit (nonce) {
    const model = this.model;

    let { success, error } = this.data.createStatus();

    try {
      let company = await model.save();

      var paymentMethod = await this.store.createRecord('payment-method', {
        nonce,
        company
      });
      await paymentMethod.save();

      this.analytics.trackEvent('Signup', 'signup', model.name);
      success();
      this.transitionToRoute('signup.finish');
    } catch (e) {
      error(e);
    }
  }
}
