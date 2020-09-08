import Controller from 'granite/core/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class PlansAddController extends Controller {
  @service data

  @action
  async save () {
    await this.data.saveRecord(this.model);
    this.transitionToRoute('account.benefits.plans');
  }

  @action
  cancel () {
    this.model.rollbackAttributes();
    this.transitionToRoute('account.benefits.plans');
  }
}
