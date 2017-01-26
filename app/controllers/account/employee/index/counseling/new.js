import Ember from 'ember';
import addEdit from 'granite/mixins/controller-abstractions/add-edit';

const { Controller, computed, inject: { service } } = Ember;

export default Controller.extend(addEdit, {
  auth: service(),
  transitionWithModel: true,
  transitionAfterSave: 'account.employee.index.counseling.issue',

  severities: computed.reads('auth.user.company.correctiveActionSeverities'),
  severitySorting: ['order'],
  sortedSeverities: computed.sort('severities', 'severitySorting'),

  form: computed(() => [{
    label: 'Issue Title',
    inputClass: 'large',
    type: 'text',
    path: 'title',
    placeholder: 'ex. Jenna is consistently late'
  }, {
    label: 'Type',
    type: 'select',
    inputClass: 'search',
    path: 'type',
    contentPath: 'controller.issueTypes',
    selectText: 'Select or type and hit enter to add a new option',
    inputAttrs: {
      allowAdditions: true
    }
  }, {
    label: 'Starting Severity',
    type: 'select',
    inputClass: 'search',
    path: 'severity',
    contentPath: 'controller.sortedSeverities',
    displayKey: 'title',
    valuePath: 'id',
    selectText: 'Select severity'
  }, {
    label: 'Exclude Employees From Issue',
    helpText: 'Excluding employees will block employees selected from seeing the issue.',
    type: 'select',
    inputClass: 'multiple search',
    path: 'excludedEmployees',
    contentPath: 'controller.employees',
    displayKey: 'fullName',
    selectText: 'Select one or multiple'
  }])
});
