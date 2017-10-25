import Ember from 'ember';
import moment from 'moment';
import addEdit from 'granite/mixins/controller-abstractions/add-edit';
import fileSupport from 'granite/mixins/file-handling';

const timezones = moment.tz.names();

const  { Controller, computed, RSVP: { Promise } } = Ember;

export default Controller.extend(addEdit, fileSupport, {
  timezones,

  settingsForm: computed(() => [{
    label: 'Timezone',
    type: 'select',
    inputClass: 'search',
    path: 'tz',
    contentPath: 'controller.timezones',
    selectText: 'Select a Time Zone'
  }]),

  /* File settings */
  dropzoneId: 'input__dropzone--company-image',
  fileData: {
    systemUse: true,
    associatedData: {
      type: 'companyProfileImage'
    }
  },

  actions: {
    saveSettings () {
      const file = this.get('fileIsAdded');

      Promise.resolve(file ? this.upload() : null)
      .then(() => this.saveModel())
      .catch(this.ajaxError.bind(this));
    }
  }
});
