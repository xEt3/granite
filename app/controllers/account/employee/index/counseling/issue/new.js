import Ember from 'ember';
import addEdit from 'granite/mixins/controller-abstractions/add-edit';
import { formalActionSuggestions } from 'granite/config/suggestions';

const { Controller, computed, inject: { service } } = Ember;

let formInputs = [{
  label: 'Option',
  type: 'select',
  inputClass: 'search',
  path: 'severity',
  contentPath: 'controller.sortedSeverities',
  displayKey: 'title',
  valuePath: 'id',
  selectText: 'Select Option'
}, {
  label: 'Date to Issue',
  type: 'date',
  path: 'issuedOn',
  helpText: 'This is the date that you presented the corrective action to the employee. This date is editable, has no effect on operations, and is only for your records.'
}, {
  label: 'Follow up date (optional)',
  type: 'date',
  path: 'followUpOn'
}, {
  label: 'Your notes',
  type: 'textarea',
  path: 'notes',
  rows: '6',
  helpText: 'These are internal notes and the employee will not see them.',
  indirectHelp: true
}, {
  label: 'Type',
  type: 'select',
  inputClass: 'search',
  path: 'type',
  contentPath: 'controller.issueTypes',
  selectText: 'Select or type and press enter to add a new option',
  inputAttrs: {
    allowAdditions: true
  }
}];

export default Controller.extend(addEdit, {
  auth: service(),
  transitionWithModel: true,
  transitionAfterSave: 'account.employee.index.counseling.issue.corrective-action',

  severities: computed.reads('auth.user.company.correctiveActionSeverities'),
  severitySorting: ['order'],
  sortedSeverities: computed.sort('severities', 'severitySorting'),

  form: computed('model.severity', 'severities.[]', function () {
    let severity = this.get('severities').findBy('id', this.get('model.severity')),
        severityIsFormal = severity && severity.get('formal');

    return severityIsFormal ? [
      ...formInputs.slice(0, 3), {
        label: 'Issues',
        type: 'textarea',
        path: 'descriptionIssues',
        helpText: formalActionSuggestions.issues,
        indirectHelp: true,
        rows: '6'
      }, {
        label: 'Expectations',
        type: 'textarea',
        path: 'descriptionExpectations',
        helpText: formalActionSuggestions.expectations,
        indirectHelp: true,
        rows: '6'
      }, {
        label: 'Consequences if expectations are not met',
        type: 'textarea',
        path: 'descriptionConsequences',
        rows: '6'
      }, ...formInputs.slice(3)
    ] : formInputs;
  })
});
