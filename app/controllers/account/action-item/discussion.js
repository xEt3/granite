import Ember from 'ember';
import addEdit from 'granite/mixins/controller-abstractions/add-edit';

const { Controller, inject } = Ember;

export default Controller.extend(addEdit, {
  auth: inject.service(),
  transitionAfterSave: false,

  actions: {
    comment () {
      let text = this.get('commentText'),
          commenter = this.get('auth.user.employee');

      this.set('commentText', null);

      let comment = this.store.createRecord('comment', {
        commenter,
        text,
        targetId: this.get('actionItem.id'),
        targetType: 'ActionItem'
      });

      this.saveModel(comment)
      .then(() => {
        this.send('refresh');
      });
    }
  }
});
