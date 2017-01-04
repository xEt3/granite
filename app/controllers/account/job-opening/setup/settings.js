import Ember from 'ember';
const { Controller, computed } = Ember;

export default Controller.extend({
  form: computed(() => [{
    label: 'Send Notifications To',
    labelClass: '',
    inputClass: 'search multiple',
    type: 'select',
    path: 'title',
    contentPath: 'controller.users',
    displayKey: ''
  }])
});
