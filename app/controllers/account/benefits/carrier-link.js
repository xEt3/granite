import Controller from 'granite/core/controller';
import { tracked } from '@glimmer/tracking';
import { match } from '@ember/object/computed';

export default class CarrierLinkController extends Controller {
  @tracked model

  get carrierRoute () {
    return  `benefits/plans/${this.model.key}`
  }
}
