/* eslint-disable ember/no-volatile-computed-properties */
import Controller from 'granite/core/controller';
import { computed, action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import titleCase from 'granite/utils/title-case';
import { decamelize } from '@ember/string';
import { states } from 'granite/config/statics';
import $ from 'jquery';

export default class AccountEmployeesAddCensusReviewController extends Controller {
  @service ajax
  @service data
  @tracked displayDryRunResults = false
  @tracked doingDryRun = false
  @tracked newLocation = {}
  @tracked newDepartment = {}

  states = states
  @computed.equal('newLocation.addressState', 'MT') stateIsMontana

  intros = [{
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
  }]

  supportedExtensions = [ 'csv', 'xls', 'xlsx' ]

  convertPathToLabel (path = '') {
    let desegmentedPath = path.replace('[]', '').replace(/\./g, ' '),
        decamelizedPath = desegmentedPath.split(' ').map(x => decamelize(x).replace(/_/g, ' ')).join(' ');

    return titleCase([ decamelizedPath ]);
  }

  @computed.reads('model.data.0') guesses

  @tracked potentialData

  get dataValidation () {
    const {
      guesses,
      availableFields,
      potentialData
    } = this;

    if (!guesses || !availableFields) {
      return [];
    }

    return this.rows.map((row, rIdx) => {
      return row.map((column, cIdx) => {
        let guessForCell = guesses[cIdx],
            potentialDataForCell = potentialData[rIdx][guessForCell],
            field = availableFields.findBy('path', guessForCell);

        if (!field) {
          return { invalid: false };
        }

        // if cell is a relationship cell, and cell has a value in it, and the potentialDataForCell is undefined
        if (field.isRelationship && column && !potentialDataForCell ? field.path : null) {
          return {
            invalid:             true,
            missingRelationship: field.path
          };
        }

        if ((availableFields.findBy('path', guessForCell) || {}).required && !column) {
          return {
            invalid:    true,
            isRequired: true
          };
        }

        return { invalid: false };
      });
    });
  }

  get rows () {
    return (this.model.data || []).slice(2);
  }

  get availableFields () {
    return (this.model.availableFields || []).map(({ path, format, enums, required }) => {
      let label = `${this.convertPathToLabel(path)}${format ? ' - ' + format : ''}`;

      if (path === 'customFields') {
        label = 'Assign a custom field';
      }

      return {
        path,
        label,
        required,
        enums,
        isRelationship: format === 'lookup or id' ? true : false
      };
    }).sortBy('label');
  }

  get headerMap () {
    const data = this.model.data,
          [ guesses, orig ] = data;

    return guesses.map((path, i) =>
      (path || '').indexOf('customFields') < 0 ? path : `${path}.${orig[i]}`);
  }

  @action
  async doDryRun (displayDryRunResults = false) {
    this.analytics.trackEvent('Employees', 'census_dryrun', 'Census Dry Run');

    const headerMap = this.headerMap,
          uploadId = this.model.uploadId;

    this.doingDryRun = true;
    let { success, error } = this.data.createStatus();

    try {
      let dryRunResult = await this.ajax.post(`/api/v1/employee/census/${uploadId}/dryrun`, { data: { headerMap } });
      this.setProperties({
        displayDryRunResults,
        doingDryRun:   null,
        potentialData: dryRunResult
      });

      success(null, true);
    } catch (e) {
      error(e);
    }
  }

  @action
  dumpDryRun () {
    this.displayDryRunResults = null;
  }

  @action
  mutateGuess (index, val) {
    this.model.data[0][index] = val;
  }

  @action
  async importRecords () {
    let { success, error } = this.data.createStatus();

    const headerMap = this.headerMap,
          uploadId = this.model.uploadId;

    this.analytics.trackEvent('Employees', 'census_imported', 'Census Imported');

    try {
      await this.ajax.post('/api/v1/employee/census/' + uploadId + '/process', { data: { headerMap } });
      success();
      this.transitionToRoute('account.employees');
    } catch (e) {
      error(e);
    }
  }

  @action
  showLocationModal (locationName) {
    this.setProperties({
      newLocation:       this.store.createRecord('location', { name: locationName }),
      respondedLocation: false
    });

    $('#modal__add-location').modal({
      detachable: true,
      closable:   false,
      onHidden:   () => {
        if (!this.respondedLocation) {
          this.respondLocationModal(false);
        }
      }
    }).modal('show');

    return new Promise((resolveLocation, rejectLocation) => this.setProperties({
      resolveLocation,
      rejectLocation
    }));
  }

  @action
  showDepartmentModal (departmentName) {
    this.setProperties({
      newDepartment:     this.store.createRecord('department', { name: departmentName }),
      respondedLocation: false
    });

    $('#modal__add-department').modal({
      detachable: true,
      closable:   false,
      onHidden:   () => {
        if (!this.respondedDepartment) {
          this.respondDepartmentModal(false);
        }
      }
    }).modal('show');

    return new Promise((resolveDepartment, rejectDepartment) => this.setProperties({
      resolveDepartment,
      rejectDepartment
    }));
  }

  @action
  respondLocationModal (response) {
    if (!response) {
      this.newLocation.destroyRecord();
    }

    this[response ? 'resolveLocation' : 'rejectLocation'](response ? this.newLocation : null);
    this.respondedLocation = true;
    $('#modal__add-location').modal('hide');
  }

  @action
  respondDepartmentModal (response) {
    if (!response) {
      this.newDepartment.destroyRecord();
      this.newDepartment = null;
    }

    this[response ? 'resolveDepartment' : 'rejectDepartment'](response ? this.newDepartment : null);
    this.respondedDepartment = true;
    $('#modal__add-department').modal('hide');
  }

  @action
  onNotify (type, msg) {
    this.data.notify(type, msg);
  }

  @action
  onRefresh () {
    this.send('refreshModel');
  }
}
