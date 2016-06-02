import Ember from 'ember';

export default Ember.Mixin.create({
  successMessageTimeout: 3,
  enableNotify: true,

  ajaxError ( err, user ) {
    let errMsg = err && err.responseText ? err.responseText : err;

    if ( errMsg && errMsg.errors ) {
      errMsg = (typeof errMsg.errors[0] === 'string' ? errMsg.errors : errMsg.errors.mapBy('detail')).join(', ');
    }

    if ( err && !user ) {
      Ember.Logger.error(err);
    }

    this.setProperties({
      working:      false,
      errorMessage: errMsg
    });

    if ( this.get('enableNotify') ) {
      this.send('notify', 'error', 'Whoops! ' + errMsg);
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
      this.send('notify', 'success', success || 'Successfully saved.');
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
