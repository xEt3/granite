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
      for (let i = 0; i < (this.model.openEnrollments || []).length; i++) {
        const oe = this.model.openEnrollments[i];

        await this.store.createRecord('openEnrollment', {
          company: await this.auth.get('user.company.id'),
          start:   moment().set({
            month: oe.start[0],
            day:   oe.start[1]
          }).toDate(),
          end: moment().set({
            month: oe.end[0],
            day:   oe.end[1]
          }).toDate()
        }).save();
      }

      await this.ajax.post('/api/v1/benefits/plan-download', {
        data: {
          carrier:     this.model.key,
          carrierData: this.carrierData
        }
      });
      success('Successfully downloaded plan data.');
      this.transitionToRoute('account.benefits.plans.integrations');
    } catch (e) {
      error(e);
    }
  }
}