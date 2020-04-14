import { Controller, modalSupport } from 'granite/core';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

@modalSupport
export default class BillingController extends Controller {
  @service ajax
  @service data
  @service subscription

  @tracked braintreeToken = null

  get statusClass () {
    return this.model.status === 'Active' ? 'text-green' : 'text-danger';
  }

  @action
  async getToken () {
    const { success, error } = this.data.createStatus();

    try {
      const token = await this.ajax.request('/api/v1/bt/token');
      this.braintreeToken = token;
      success(null, true);
    } catch (err) {
      error(err);
    }
  }

  @action
  async savePaymentMethod (nonce) {
    if (!nonce) {
      return;
    }

    const { success, error } = this.data.createStatus(),
          paymentMethod = this.paymentMethod;

    try {
      paymentMethod.set('nonce', nonce);

      await paymentMethod.save();

      success('Payment method saved succesfully');
      this.target.refreshModel();
    } catch (err) {
      error(err);
    }
  }

  @action
  async cancelSubscription () {
    const { success, error } = this.data.createStatus(),
          company = this.company;

    try {
      company.set('deactivatedOn', new Date());
      company.set('reactivatedOn', null);

      await company.save();
      this.target.refreshModel();
      success('Deactivated account', true);
    } catch (err) {
      error(err);
    }
  }

  @action
  async activateSubscription () {
    const { success, error } = this.data.createStatus(),
          company = this.company;

    try {
      company.set('reactivatedOn', new Date());
      company.set('deactivatedOn', null);

      await company.save();
      this.target.refreshModel();
      success('Reactivated account', true);
    } catch (err) {
      error(err);
    }
  }
}
