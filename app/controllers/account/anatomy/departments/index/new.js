import Controller from '@ember/controller';
import addEdit from 'granite/mixins/controller-abstractions/add-edit';

export default Controller.extend(addEdit, {
  transitionAfterSave: 'account.anatomy.departments.index',
  transitionWithModel: false,

  afterSave () {
    this.send('refresh');
  }
});
