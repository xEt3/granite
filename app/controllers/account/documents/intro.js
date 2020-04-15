import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';

@classic
export default class IntroController extends Controller {
  @service
  auth;

  @action
  done () {
    let user = this.get('auth.user.content');
    user.get('shownHints').addObject('documents');
    user.save()
    .then(() => this.transitionToRoute('account.documents.index'));
  }
}
