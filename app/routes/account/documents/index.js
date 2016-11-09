import Ember from 'ember';

const { Route, inject } = Ember;

export default Route.extend({
  auth: inject.service(),

  beforeModel () {
    let hints = this.get('auth.user.shownHints');

    if ( !hints || !hints.includes('documents') ) {
      return this.transitionTo('account.documents.intro');
    }
  }
});
