import Component from '@glimmer/component';
import { filingStatuses } from 'granite/config/statics';
import { action } from '@ember/object';

const STEPPING_STEP3 = 500;

export default class w4Component extends Component {
  filingStatuses = filingStatuses
  classNames =      [ 'row' ]
  federalTaxStep2 = [{
    label: 'Yes',
    value: true
  }, {
    label: 'No',
    value: false
  }]

  get isExempt () {
    return this.args.model.federalTaxFilingStatus === 'Exempt';
  }

  @action
  updateFederalTaxFilingStatus (val) {
    this.model.set('federalTaxFilingStatus', val);

    if (this.isExempt) {
      this.args.model.setProperties({
        federalTaxStep2:  null,
        federalTaxStep3:  null,
        federalTaxStep4a: null,
        federalTaxStep4b: null,
        federalTaxStep4c: null
      });
    }
  }

  @action
  updateStep3 (val) {
    const nVal = val && parseInt(val, 0);
    this.args.model.set('federalTaxStep3',
      nVal % STEPPING_STEP3 ?
        // Value must be rounded to a step
        Math.round(nVal / STEPPING_STEP3) * STEPPING_STEP3 :
        // Value is in the stepping range
        nVal
    );
  }
}
