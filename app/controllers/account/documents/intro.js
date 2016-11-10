import Ember from 'ember';

const { Controller, inject } = Ember;

export default Controller.extend({
  auth: inject.service(),

  actions: {
    done () {
      let user = this.get('auth.user.content');
      user.get('shownHints').addObject('documents');
      user.save()
      .then(() => this.transitionToRoute('account.documents.index'));
    }
  }
});
