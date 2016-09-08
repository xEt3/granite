import Ember from 'ember';
import ajaxStatus from 'granite/mixins/ajax-status';

const { Controller } = Ember;

export default Controller.extend(ajaxStatus, {
  activity: Ember.inject.service(),
  actions: {
    login () {
      let a = this.store.createRecord('activity', {
        icon: 'test'
      });
      console.log(a);
      console.log(a.get('test'));
      const email = this.get('email'),
            password = this.get('password');

      this.ajaxStart();

      if ( !email || !password ) {
        return this.ajaxError('Please complete all fields before submitting.');
      }

      this.auth.login(email, password)
      .then(() => {
        return this.get('activity').create({
          description: '{{actor.doc.name.first}} logged in for the first time. Good for you buddy.',
          icon: 'check'
        });
      })
      .then(() => {
        let previousTransition = this.get('previousTransition');
        this.ajaxSuccess('Successfully logged in.');

        if ( previousTransition ) {
          previousTransition.retry();
        } else {
          this.transitionToRoute('account.index');
        }
      })
      .catch(this.ajaxError.bind(this));
    }
  }
});
