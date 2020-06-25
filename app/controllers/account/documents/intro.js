import Controller from 'granite/core/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class IntroController extends Controller {
  @service auth

  @action
  async done () {
    let user = this.auth.user.content;
    user.get('shownHints').addObject('documents');
    await user.save();
    this.transitionToRoute('account.documents.index');
  }
}
