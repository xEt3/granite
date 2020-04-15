import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import Controller from '@ember/controller';
import addEdit from 'granite/mixins/controller-abstractions/add-edit';

@classic
export default class DocumentsController extends Controller.extend(addEdit) {
  @action
  removeDocument (doc) {
    let model = this.model;

    model.get('documents').removeObject(doc);
    this.send('save', model);
  }
}
