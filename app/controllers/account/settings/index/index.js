import Ember from 'ember';
import moment from 'moment';
import addEdit from 'granite/mixins/controller-abstractions/add-edit';

const timezones = moment.tz.names();

const  { Controller, computed } = Ember;

export default Controller.extend(addEdit, {
  timezones,

  settingsForm: computed(() => [{
    label: 'Timezone',
    type: 'select',
    inputClass: 'search',
    path: 'tz',
    contentPath: 'controller.timezones',
    selectText: 'Select a Time Zone'
  }])
});
