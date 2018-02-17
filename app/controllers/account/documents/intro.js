import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  auth: service(),

  actions: {
    done () {
      let user = this.get('auth.user.content');
      user.get('shownHints').addObject('documents');
      user.save()
      .then(() => this.transitionToRoute('account.documents.index'));
    }
  }
});
