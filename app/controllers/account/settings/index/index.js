import Controller from 'granite/core/controller';
import { fileHandling } from 'granite/core';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { Promise } from 'rsvp';
import moment from 'moment';
import { states } from 'granite/config/statics';

const timezones = moment.tz.names();

@fileHandling
export default class SettingsIndexIndexController extends Controller {
  @service data
  @service store

  timezones = timezones
  states = states

  /* File settings */
  dropzoneId = 'input__dropzone--company-image'
  fileData = {
    systemUse:      true,
    associatedData: { type: 'companyProfileImage' }
  }

  settingsForm = [{
    label:       'Company Name',
    type:        'text',
    path:        'name',
    parentClass: 'sixteen wide'
  }, {
    label:       'Email',
    type:        'text',
    path:        'email',
    parentClass: 'sixteen wide'
  }, {
    label:       'Address Line 1',
    type:        'text',
    path:        'addressLine1',
    parentClass: 'sixteen wide'
  }, {
    label:       'Address Line 2',
    type:        'text',
    path:        'addressLine2',
    parentClass: 'sixteen wide'
  }, {
    label:       'City',
    type:        'text',
    path:        'addressCity',
    parentClass: 'six wide'
  }, {
    label:       'State',
    type:        'select',
    inputClass:  'search',
    path:        'addressState',
    contentPath: 'controller.states',
    displayKey:  'label',
    valuePath:   'value',
    parentClass: 'six wide',
    selectText:  'Select a State'
  }, {
    label:       'Zipcode',
    type:        'text',
    path:        'addressZipcode',
    parentClass: 'four wide'
  }, {
    label:       'EIN',
    type:        'text',
    path:        'ein',
    parentClass: 'sixteen wide'
  }, {
    label:       'Timezone',
    type:        'select',
    inputClass:  'search',
    path:        'tz',
    contentPath: 'controller.timezones',
    selectText:  'Select a Time Zone',
    parentClass: 'sixteen wide'
  }]

  @action
  async saveSettings () {
    const file = this.files.fileIsAdded;
    let uploaded = await Promise.resolve(file ? this.files.upload() : null);

    if (uploaded) {
      this.model.logo = uploaded;
      this.model.logoUrl = uploaded.url;
    }

    return this.data.saveRecord(this.model);
  }
}
