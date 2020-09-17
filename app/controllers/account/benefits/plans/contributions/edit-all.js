import Controller from 'granite/core/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class ContributionsEditAllController extends Controller {
  @service data;

  @action
  async save (wp) {
    let plans = await this.get(';model');
    for (let i = 0; i <= plans.length; i++) {
      await plans[i].set('wellnessPlan', wp);
      await this.data.saveRecord(plans[i]);
    }
    this.transitionToRoute('account.benefits.plans');
  }

  @action
  cancel () {
    this.model.invoke('rollbackAttributes');
    this.transitionToRoute('account.benefits.plans');
  }
}
