import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import addEdit from 'granite/mixins/controller-abstractions/add-edit';

export default Controller.extend(addEdit, {
  auth:                service(),
  transitionAfterSave: false,

  actions: {
    comment () {
      let text = this.get('commentText'),
          commenter = this.get('auth.user.employee');

      this.set('commentText', null);

      let comment = this.store.createRecord('comment', {
        commenter,
        text,
        targetId:   this.get('actionItem.id'),
        targetType: 'ActionItem'
      });

      this.saveModel(comment)
      .then(() => {
        this.send('refresh');
      });
    }
  }
});
