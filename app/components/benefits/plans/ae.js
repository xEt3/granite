import Component from '@glimmer/component';
import { action } from '@ember/object';
import { carriers } from 'granite/config';

export default class AEComponent extends Component {
  carrier = carriers.find(carrier => carrier.key === 'ae')

  @action
  updateCarrierData (key, val) {
    this[key] = val;

    this.args.onDataUpdate({
      carrierAuthCode: this.carrierAuthCode,
      companyId:       this.companyId
    });

    this.args.onValidityChange(!!(this.carrierAuthCode && this.companyId));
  }
}
