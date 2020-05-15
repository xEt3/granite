import Controller from 'granite/core/controller';
import { htmlSafe } from '@ember/string';
import { inject as service } from '@ember/service';

export default class AccountAssetEditController extends Controller {
  @service data

  saveOptions = {
    transitionAfterSave: 'account.asset',
    transitionWithModel: true
  }

  icons = 'mobile tablet desktop laptop car lab configure asterisk cube sound photo'.w()

  get sharableLabel () {
    return this.model.name ? htmlSafe(`Can ${this.model.name} be shared by employees`) : htmlSafe('Can these assets be shared by employees');
  }

  get disableSave () {
    let initialDocuments = this.initialDocuments,
        dirtyAttributes = this.model.hasDirtyAttributes;


    let modelDocuments = JSON.stringify(this.model.documents.toArray());
    let dirtyDocuments = modelDocuments === initialDocuments ? false : true;
    return dirtyDocuments || dirtyAttributes ? false : true;

  }
}
