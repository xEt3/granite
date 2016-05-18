import Ember from 'ember';

var notificationOptions = {
  positionClass: 'toast-bottom-center'
};

export default Ember.Mixin.create({
  successMessageTimeout: 3,
  enableNotify: false,
  notify: Ember.inject.service(),

  ajaxError ( err, user ) {
    let errMsg = err && err.responseText ? err.responseText : err;

    if ( errMsg && errMsg.errors ) {
      errMsg = errMsg.errors.mapBy('detail').join(', ');
    }

    if ( err && !user ) {
      Ember.Logger.error(err);
    }

    this.setProperties({
      working:      false,
      errorMessage: errMsg
    });

    if ( this.get('enableNotify') ) {
      this.get('notify').error(errMsg, user ? 'Whoops!' : 'Error Saving!', notificationOptions);
    }
  },

  ajaxSuccess ( success ) {
    this.setProperties({
      working:        false,
      errorMessage:   null,
      successMessage: success
    });

    Ember.run.later(() => {
      if ( !this.get('isDestroyed') && !this.get('isDestroying') ) {
        this.set('successMessage', null);
      }
    }, this.get('successMessageTimeout') * 1000);

    if ( this.get('enableNotify') ) {
      this.get('notify').success(success || 'Successfully saved.', 'Saved!', notificationOptions);
    }
  },

  ajaxStart () {
    this.setProperties({
      working:        true,
      errorMessage:   null,
      successMessage: null
    });
  }
});
