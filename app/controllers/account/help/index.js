import Controller from '@ember/controller';
import addEdit from 'granite/mixins/controller-abstractions/add-edit';

export default Controller.extend(addEdit, {
  actions: {
    resetIntros () {
      let user = this.get('user');
      user.set('shownHints', []);
      this.send('save', user);
    }
  }
});
