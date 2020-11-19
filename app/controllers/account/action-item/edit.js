import Controller from 'granite/core/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { htmlSafe } from '@ember/string';

export default class AccountActionItemEditController extends Controller {
  @service data
  calendarLabel =       htmlSafe('<i class="clock icon"></i> Assign a Due Date')

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
