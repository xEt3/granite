import Controller from '@ember/controller';
import addEdit from 'granite/mixins/controller-abstractions/add-edit';

export default Controller.extend(addEdit, {
  transitionAfterSave: 'account.employee.index.documents',
  transitionWithModel: false,
  isExpanded:          false,

  afterSave () {
    this.send('refresh');
  }
});
