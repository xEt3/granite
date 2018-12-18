import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import ajaxStatus from 'granite/mixins/ajax-status';
import titleCase from 'granite/utils/title-case';
import { decamelize } from '@ember/string';
import { states } from 'granite/config/statics';
import $ from 'jquery';

export default Controller.extend(ajaxStatus, {
  states,

  ajax: service(),

  stateIsMontana: computed.equal('newLocation.addressState', 'MT'),

  intros: computed(function () {
    return [{
      element:  '.guess-fields-row > th:first-child',
      intro:    'We\'ve attempted to guess the columns that you uploaded. This row represents our guesses.',
      position: 'top'
    }, {
      element:  '.guess-fields-ro > th.field:first-child input',
      intro:    'Use a select box to change the field if our guess was incorrect.',
      position: 'top'
    }, {
      element:  '.client-fields-row > th:first-child',
      intro:    'We show the column labels you originally uploaded here for reference.',
      position: 'top'
    }, {
      element:  '.data-rows',
      intro:    'Review this section before continuing to make sure your data is imported correctly.',
      position: 'top'
    }, {
      element:  '.btn__dry-run',
      intro:    'Generate a "dry run" with this button. This allows you to review what data will be created before importing.',
      position: 'bottom'
    }, {
      element:  '.import-button',
      intro:    'Click import to import the data you have reviewed on this screen.',
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

  ava: computed('model.availableFields.[]', function () {
    let orgData = this.get('model.data')[0];
    let newArray = [];
    let availableFields = this.get('model.availableFields');
    let enumPath = [];

    availableFields.forEach(field=>{
      enumPath.push(field.path);
      return;
    });

    orgData.forEach(data=>{
      newArray.push(availableFields[enumPath.indexOf(data)]);
    });
    newArray.forEach(array=>{
      if (array.enums && array.enums.includes(null)) {
        let index = array.enums.indexOf(null);
        array.enums.splice(index, 1);
        return array.enums;
      }
    });
    return newArray;
  }),

  availableFields: computed('model.availableFields.[]', function () {
    return (this.get('model.availableFields') || []).map(({ path, format }) => {
      let label = `${this.convertPathToLabel(path)}${format ? ' - ' + format : ''}`;

      if (path === 'customFields') {
        label = 'Assign a custom field';
      }

      return {
        path,
        label,
        isRelationship: format === 'lookup or id' ? true : false
      };
    }).sortBy('label');
  }),

  headerMap: computed('model.data.0.[]', function () {
    const data = this.get('model.data'),
          [ guesses, orig ] = data;

    return guesses.map((path = '', i) =>
      path.indexOf('customFields') < 0 ? path : `${path}.${orig[i]}`);
  }).volatile(),

  actions: {
    doDryRun (displayDryRunResults = false) {
      const headerMap = this.get('headerMap'),
            uploadId = this.get('model.uploadId');

      this.set('doingDryRun', true);
      this.ajaxStart();

      return this.get('ajax').post(`/api/v1/employee/census/${uploadId}/dryrun`, { data: { headerMap } }).then(dryrunResult => {
        this.setProperties({
          displayDryRunResults,
          doingDryRun:   null,
          potentialData: dryrunResult
        });
        this.ajaxSuccess(null, true);
      }).catch(this.ajaxError.bind(this));
    },

    dumpDryRun () {
      this.set('displayDryRunResults', null);
    },

    mutateGuess (index, val) {
      this.set(`model.data.0.${index}`, val);
    },

    importRecords () {
      this.ajaxStart();

      const headerMap = this.get('headerMap'),
            uploadId = this.get('model.uploadId');

      this.get('ajax').post('/api/v1/employee/census/' + uploadId + '/process', { data: { headerMap } })
      .then(() => {
        this.ajaxSuccess();
        this.transitionToRoute('account.employees');
      })
      .catch(this.ajaxError.bind(this));
    },

    showLocationModal (locationName) {
      this.setProperties({
        newLocation:       this.get('store').createRecord('location', { name: locationName }),
        respondedLocation: false
      });

      $('#modal__add-location').modal({
        detachable: true,
        closable:   false,
        onHidden:   () => {
          if (!this.get('respondedLocation')) {
            this.send('respondLocationModal', false);
          }
        }
      }).modal('show');

      return new Promise((resolveLocation, rejectLocation) => this.setProperties({
        resolveLocation,
        rejectLocation
      }));
    },

    showDepartmentModal (departmentName) {
      this.setProperties({
        newDepartment:     this.get('store').createRecord('department', { name: departmentName }),
        respondedLocation: false
      });

      $('#modal__add-department').modal({
        detachable: true,
        closable:   false,
        onHidden:   () => {
          if (!this.get('respondedDepartment')) {
            this.send('respondDepartmentModal', false);
          }
        }
      }).modal('show');

      return new Promise((resolveDepartment, rejectDepartment) => this.setProperties({
        resolveDepartment,
        rejectDepartment
      }));
    },

    respondLocationModal (response) {
      if (!response) {
        this.get('newLocation').destroyRecord();
      }

      this.get(response ? 'resolveLocation' : 'rejectLocation')(response ? this.get('newLocation') : null);
      this.set('respondedLocation', true);
      $('#modal__add-location').modal('hide');
    },

    respondDepartmentModal (response) {
      if (!response) {
        this.get('newDepartment').destroyRecord();
        this.set('newDepartment', null);
      }

      this.get(response ? 'resolveDepartment' : 'rejectDepartment')(response ? this.get('newDepartment') : null);
      this.set('respondedDepartment', true);
      $('#modal__add-department').modal('hide');
    },

    onNotify (type, msg) {
      this.send('notify', type, msg);
    },

    onRefresh () {
      this.send('refresh');
    }
  }
});
