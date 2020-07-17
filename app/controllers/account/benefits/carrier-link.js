import Controller from 'granite/core/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class CarrierLinkController extends Controller {
  @service data
  @service ajax

  get carrierRoute () {
    return `benefits/plans/${this.model.key}`;
  }

  @action
  async linkCarrier () {
    const { success, error } = this.data.createStatus('carrierLink');
    try {
      await this.ajax.post('/api/v1/benefits/plan-download', {
        data: {
          carrier:     this.model.key,
          carrierData: this.carrierData
        }
      });
      success('Successfully downloaded plan data.');
      this.transitionToRoute("account/benefits/plans")
    } catch (e) {
      error(e);
    }
  }
}
