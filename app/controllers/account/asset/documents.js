import Controller from 'granite/core/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class AccountAssetDocumentsController extends Controller {
  @service data

  @action
  removeDocument (doc) {
    let model = this.model;

    model.documents.removeObject(doc);
    this.data.saveRecord(model);
  }
}
