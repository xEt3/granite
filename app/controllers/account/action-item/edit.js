import Controller from 'granite/core/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class AccountActionItemEditController extends Controller {
  @service data
  afterSaveOptions = {
    transitionAfterSave: 'account.action-item.index',
    transitionWithModel: true,
    modelIdentifier:     'slug'
  }

  @action
  updatePriority (newValue) {
    this.set('model.priority', newValue[0]);
  }
}
