import Controller from '@ember/controller';
import del from 'granite/mixins/controller-abstractions/delete';
import addEdit from 'granite/mixins/controller-abstractions/add-edit';

export default Controller.extend(del, addEdit, {
  _afterDelete () {
    this.send('refresh');
  },

  actions: {
    onNotify (type, msg) {
      this.send('notify', type, msg);
    }
  }
});
