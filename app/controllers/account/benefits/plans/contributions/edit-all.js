import Controller from 'granite/core/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class ContributionsEditAllController extends Controller {
  @service data;

  @action
  async save (wp) {
    let plans = await this.model;
    for (let i = 0; i <= plans.length - 1; i++) {
      plans[i].wellnessPlan = wp;
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
