import Controller from '@ember/controller';
import addEdit from 'granite/mixins/controller-abstractions/add-edit';
import { suffixes, gender } from 'granite/config/statics';

export default Controller.extend(addEdit, {
  suffixes,
  gender,
  transitionAfterSave: 'account.employee.onboard.index',
  transitionWithModel: true
});
