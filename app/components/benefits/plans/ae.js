import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class AeComponent extends Component {

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
      error(e);
      throw e;
    }
  }
}

