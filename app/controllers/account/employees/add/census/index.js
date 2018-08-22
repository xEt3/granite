import Controller from '@ember/controller';
import { run } from '@ember/runloop';
import { inject as service } from '@ember/service';
import ajaxStatus from 'granite/mixins/ajax-status';

export default Controller.extend(ajaxStatus, {
  ajax: service(),

  supportedExtensions: [ 'csv', 'xls', 'xlsx' ],

  actions: {
    fileUploadError ( err ) {
      this.set('fileUploadError', err);

      run.later(() => {
        this.set('fileUploadError', undefined);
      }, 1500);
    },

    successHandler ( response ) {
      this.transitionToRoute('account.employees.add.census.review', response);
    },

    onNotify ( type, msg ) {
      this.send('notify', type, msg);
    }
  }
});
