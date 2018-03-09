import Controller from '@ember/controller';
import { computed, get } from '@ember/object';
import { A } from '@ember/array';
import { run } from '@ember/runloop';
import { inject as service } from '@ember/service';
import Employee from 'granite/models/employee';
import ajaxStatus from 'granite/mixins/ajax-status';

const apiFieldMap = {
  firstName: 'name.first',
  middleName: 'name.middle',
  lastName: 'name.last',
  suffixName: 'name.suffix'
};

export default Controller.extend(ajaxStatus, {
  ajax: service(),

  intros: computed(function () {
    return [{
      element: '.guess-fields-row',
      intro: 'We\'ve attempted to guess the columns that you uploaded. This row represents our guesses.',
      position: 'top'
    }, {
      element: '.guess-fields-row .field input',
      intro: 'Use a select box to change the field if our guess was incorrect.',
      position: 'top'
    }, {
      element: '.client-fields-row',
      intro: 'We show the column labels you originally uploaded here for reference.',
      position: 'top'
    }, {
      element: '.data-rows',
      intro: 'Review this section before continuing to make sure your data is imported correctly.',
      position: 'bottom'
    }, {
      element: '.import-button',
      intro: 'Click import to import the data you have reviewed on this screen.',
      position: 'bottom'
    }];
  }),

  supportedExtensions: [ 'csv', 'xls', 'xlsx' ],

  rows: computed('data', function () {
    return this.get('data') ? this.get('data').slice(2) : false;
  }),

  availableFields: computed(function () {
    const fields = A(),
          modelFields = get(Employee, 'fields');

    modelFields.forEach((kind, field) => {
      let convert = apiFieldMap[field];
      fields.addObject(convert || field);
    });

    return fields;
  }),

  actions: {
    fileUploadError ( err ) {
      this.set('fileUploadError', err);

      run.later(() => {
        this.set('fileUploadError', undefined);
      }, 1500);
    },

    successHandler ( response ) {
      this.setProperties({
        data: response.data,
        fileId: response.id
      });
    },

    onNotify ( type, msg ) {
      this.send('notify', type, msg);
    },

    reset () {
      this.set('data', undefined);
    },

    importRecords () {
      let reference = this.get('data.firstObject'),
          id = this.get('fileId');

      this.ajaxStart();

      this.get('ajax').post('/api/v1/employee/census/' + id + '/process', {
        data: { reference }
      })
      .then(() => {
        this.ajaxSuccess();
        this.send('reset');
        this.transitionToRoute('account.employees');
      })
      .catch(this.ajaxError.bind(this));
    },

    mutateGuess (i, val) {
      this.set(`data.0.${i}`, val);
    }
  }
});
