import Controller from '@ember/controller';
import { computed } from '@ember/object';
import addEdit from 'granite/mixins/controller-abstractions/add-edit';
import { forms } from 'granite/config/forms/educate-add';

export default Controller.extend(addEdit, {
  currentForm:         computed(() => forms.certification),
  transitionAfterSave: 'account.employee.index.education.certification.index'
});
