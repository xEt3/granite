import Controller from 'granite/core/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class ContributionsEditController extends Controller {
  @service data;

  @action
  async save (wp) {
    this.model.set('wellnessPlan', wp);
    await this.data.saveRecord(this.model);
    this.transitionToRoute('account.benefits.plans');
  }

  @action
  async cancel () {
    this.model.rollbackAttributes();
    this.transitionToRoute('account.benefits.plans');
  }
}
