import Ember from 'ember';
import ajaxStatus from 'granite/mixins/ajax-status';

const { Controller } = Ember;

export default Controller.extend(ajaxStatus, {
  actions: {
    login () {
      const email = this.get('email'),
            password = this.get('password');

      this.ajaxStart();

      if ( !email || !password ) {
        return this.ajaxError('Please complete all fields before submitting.');
      }

      this.auth.login(email, password)
      .then(() => {
        this.ajaxSuccess('Successfully logged in.');
        this.transitionToRoute('index');
      })
      .catch(this.ajaxError.bind(this));
    }
  }
});
