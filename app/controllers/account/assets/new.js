import Controller from 'granite/core/controller';
import { htmlSafe } from '@ember/string';
import { inject as service } from '@ember/service';

export default class AccountAssetsNewController extends Controller {
  @service data

  saveOptions = {
    transitionAfterSave: 'account.asset',
    transitionWithModel: true
  }

  icons = 'mobile tablet desktop laptop car lab configure asterisk cube sound photo'.w()

  get sharableLabel () {
    return this.model.name ? htmlSafe(`Can ${this.model.name} be shared by employees`) : htmlSafe('Can these assets be shared by employees');
  }
}
