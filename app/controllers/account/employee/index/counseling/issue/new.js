import Ember from 'ember';
import addEdit from 'granite/mixins/controller-abstractions/add-edit';

const { Controller, computed, inject: { service } } = Ember;

export default Controller.extend(addEdit, {
  auth: service(),
  transitionWithModel: true,
  transitionAfterSave: 'account.employee.index.counseling.issue.corrective-action',

  severities: computed.reads('auth.user.company.correctiveActionSeverities'),
  severitySorting: ['order'],
  sortedSeverities: computed.sort('severities', 'severitySorting'),

  form: computed(() => [{
    label: 'Date to Issue',
    type: 'date',
    path: 'issuedOn',
    helpText: 'This is the date that you presented the corrective action to the employee. This date is editable, has no effect on operations, and is only for your records.'
  }, {
    label: 'Should you follow up?',
    type: 'date',
    path: 'followUpOn',
    helpText: 'If not, leave blank'
  }, {
    label: 'Description',
    type: 'textarea',
    path: 'description',
    rows: '9'
  }, {
    label: 'Your notes',
    type: 'textarea',
    path: 'notes',
    rows: '6'
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
    label: 'Severity',
    type: 'select',
    inputClass: 'search',
    path: 'severity',
    contentPath: 'controller.sortedSeverities',
    displayKey: 'title',
    valuePath: 'id',
    selectText: 'Select severity'
  }])
});
