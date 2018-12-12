import Controller from '@ember/controller';
import addEdit from 'granite/mixins/controller-abstractions/add-edit';

export default Controller.extend(addEdit, {

  actions: {
    removeDocument (doc) {
      let model = this.get('model');

      model.get('documents').removeObject(doc);
      this.send('save', model);
    }
  }
});
