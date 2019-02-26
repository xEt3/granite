import Controller from '@ember/controller';
import addEdit from 'granite/mixins/controller-abstractions/add-edit';

export default Controller.extend(addEdit, {
  transitionAfterSave: 'account.asset',
  transitionWithModel: false,

  afterSave () {
    this.send('refresh');
  }
});
