import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import ajaxStatus from 'granite/mixins/ajax-status';
import titleCase from 'granite/utils/title-case';
import { decamelize } from '@ember/string';

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

  convertPathToLabel (path = '') {
    let desegmentedPath = path.replace('[]', '').replace(/\./g, ' '),
        decamelizedPath = desegmentedPath.split(' ').map(x => decamelize(x).replace(/_/g, ' ')).join(' ');

    return titleCase([ decamelizedPath ]);
  },

  rows: computed('model.data.[]', function () {
    return (this.get('model.data') || []).slice(2);
  }),


  availableFields: computed('model.availableFields.[]', function () {
    return (this.get('model.availableFields') || []).map(({ path, format }) => ({
      path,
      label: `${this.convertPathToLabel(path)} - ${format}`
    }));
  }),

  actions: {
    doDryRun () {
      const headerMap = this.get('model.data')[0],
            uploadId = this.get('model.uploadId');

      this.set('dryrun', true);
      this.ajaxStart();

      return this.get('ajax').post(`/api/v1/employee/census/${uploadId}/dryrun`, {
        data: { headerMap }
      }).then(dryrunResult => {
        this.set('dryrun', null);
        this.set('dryrunResult', dryrunResult);
        this.ajaxSuccess(null, true);
      }).catch(this.ajaxError.bind(this));
    },

    dumpDryRun () {
      this.set('dryrunResult', null);
    },

    mutateGuess (i, val) {
      this.set(`model.data.0.${i}`, val);
    },

    importRecords () {
      this.ajaxStart();

      const headerMap = this.get('model.data')[0],
            uploadId = this.get('model.uploadId');

      this.get('ajax').post('/api/v1/employee/census/' + uploadId + '/process', {
        data: { headerMap }
      })
      .then(() => {
        this.ajaxSuccess();
        this.transitionToRoute('account.employees');
      })
      .catch(this.ajaxError.bind(this));
    }
  }
});
