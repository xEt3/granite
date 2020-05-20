import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default class AccountAssetController extends Controller {
  @service data

  deleteOptions = { transitionAfterSave: 'account.assets' }
}
