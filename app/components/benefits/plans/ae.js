import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class AEComponent extends Component {
  @service ajax

  @action
  async linkCarrier () {
    try {
      await this.ajax.post('/api/v1/benefits/plan-download', {
        carrierData: {
          authorizationCode: this.authorizationCode,
          companyID:         this.companyId
        }
      });
    } catch (e) {
      throw e;
    }
  }
}

