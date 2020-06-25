import Controller from 'granite/core/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class AccountAssetInformationController extends Controller {
  @service data

  @tracked pendingAttribute = null
  @tracked addingAttribute = false

  @action
  afterSave () {
    this.pendingAttribute = null;
    this.addingAttribute = false;
  }

  @action
  removeAttribute (attr) {
    this.model.attributes.removeObject(attr);
    this.data.saveRecord(this.model);
  }

  @action
  saveAttribute () {
    let model = this.model,
        attr = this.pendingAttribute;

    let { error } = this.data.createStatus();

    if (!attr) {
      error('Attribute name is required.');
      return;
    }

    model.attributes.addObject(attr);
    this.data.saveRecord(model);
  }
}
