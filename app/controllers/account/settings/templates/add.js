import Controller from 'granite/core/controller';
import { inject as service } from '@ember/service';

export default class AccountSettingsTemplatesAddController extends Controller {
  @service data

  saveOptions = {
    transitionAfterSave: 'account.settings.templates',
    transitionWithModel: false
  }
}
