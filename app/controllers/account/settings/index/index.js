import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { Promise } from 'rsvp';
import moment from 'moment';
import addEdit from 'granite/mixins/controller-abstractions/add-edit';
import fileSupport from 'granite/mixins/file-handling';
import { states } from 'granite/config/statics';

const timezones = moment.tz.names();

export default Controller.extend(addEdit, fileSupport, {
  timezones,
  states,

  settingsForm: computed(() => [{
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
    label:       'Timezone',
    type:        'select',
    inputClass:  'search',
    path:        'tz',
    contentPath: 'controller.timezones',
    selectText:  'Select a Time Zone',
    parentClass: 'sixteen wide'
  }]),

  /* File settings */
  dropzoneId: 'input__dropzone--company-image',
  fileData:   {
    systemUse:      true,
    associatedData: { type: 'companyProfileImage' }
  },

  actions: {
    saveSettings () {
      const file = this.get('fileIsAdded');

      Promise.resolve(file ? this.upload() : null)
      .then(uploaded => {
        if (uploaded) {
          this.get('model').setProperties({
            logo:    uploaded,
            logoUrl: uploaded.get('url')
          });
        }

        return this.saveModel();
      })
      .catch(this.ajaxError.bind(this));
    }
  }
});
