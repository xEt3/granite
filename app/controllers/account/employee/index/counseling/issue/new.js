import Controller from 'granite/core/controller';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { formalActionSuggestions } from 'granite/config/suggestions';

let formInputs = [{
  label:       'Option',
  type:        'select',
  inputClass:  'search',
  path:        'severity',
  contentPath: 'controller.sortedSeverities',
  displayKey:  'title',
  valuePath:   'id',
  selectText:  'Select Option'
}, {
  label:    'Date to Issue',
  type:     'date',
  path:     'issuedOn',
  helpText: 'This is the date that you presented the corrective action to the employee. This date is editable, has no effect on operations, and is only for your records.'
}, {
  label: 'Follow up date (optional)',
  type:  'date',
  path:  'followUpOn'
}, {
  label:        'Your notes',
  type:         'textarea',
  path:         'notes',
  rows:         '6',
  helpText:     'These are internal notes and the employee will not see them.',
  indirectHelp: true
}, {
  label:       'Type',
  type:        'select',
  inputClass:  'search',
  path:        'type',
  contentPath: 'controller.issueTypes',
  selectText:  'Select or type and press enter to add a new option',
  inputAttrs:  { allowAdditions: true }
}];

export default class AccountEmployeeCounselingIssueNewController extends Controller {
  @service auth
  @service data

  severitySorting = [ 'order' ]
  saveOptions = {
    transitionWithModel: true,
    transitionAfterSave: 'account.employee.index.counseling.issue.corrective-action'
  }

  @computed.reads('auth.user.company.correctiveActionSeverities') severities
  @computed.sort('severities', 'severitySorting') sortedSeverities

  get form () {
    let severity = this.severities.findBy('id', this.model.severity),
        severityIsFormal = severity && severity.formal;

    return severityIsFormal ? [
      ...formInputs.slice(0, 3), {
        label:        'Issues',
        type:         'textarea',
        path:         'descriptionIssues',
        helpText:     formalActionSuggestions.issues,
        indirectHelp: true,
        rows:         '6'
      }, {
        label:        'Expectations',
        type:         'textarea',
        path:         'descriptionExpectations',
        helpText:     formalActionSuggestions.expectations,
        indirectHelp: true,
        rows:         '6'
      }, {
        label: 'Consequences if expectations are not met',
        type:  'textarea',
        path:  'descriptionConsequences',
        rows:  '6'
      }, ...formInputs.slice(3)
    ] : formInputs;
  }
}
