import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import addEdit from 'granite/mixins/controller-abstractions/add-edit';

export default Controller.extend(addEdit, {
  auth:                service(),
  transitionWithModel: true,
  transitionAfterSave: 'account.employee.index.counseling.issue',

  severities:       computed.reads('auth.user.company.correctiveActionSeverities'),
  severitySorting:  [ 'order' ],
  sortedSeverities: computed.sort('severities', 'severitySorting'),

  form: computed(() => [{
    label:       'Issue Title',
    inputClass:  'large',
    type:        'text',
    path:        'title',
    placeholder: 'ex. Jenna is consistently late'
  }, {
    label:       'Category',
    type:        'select',
    inputClass:  'search',
    path:        'type',
    contentPath: 'controller.issueTypes',
    selectText:  'Select or type and hit enter to add a new option',
    inputAttrs:  { allowAdditions: true }
  }, {
    label:       'Starting Option',
    type:        'select',
    inputClass:  'search',
    path:        'severity',
    contentPath: 'controller.sortedSeverities',
    displayKey:  'title',
    valuePath:   'id',
    selectText:  'Select Option'
  }, {
    label:       'Exclude Users From Issue',
    helpText:    'Excluding users will block selected users from seeing the issue. This is useful for conflicts of interest.',
    type:        'select',
    inputClass:  'multiple search',
    path:        'excludedUsers',
    contentPath: 'controller.users',
    displayKey:  'fullName',
    selectText:  'Select one or multiple'
  }])
});
