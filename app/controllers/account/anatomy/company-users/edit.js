import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import Controller from '@ember/controller';
import addEdit from 'granite/mixins/controller-abstractions/add-edit';

@classic
export default class EditController extends Controller.extend(addEdit) {
  transitionAfterSave = 'account.anatomy.company-users';
  transitionWithModel = false;

  @action
  presetAttrs() {
    let model = this.model,
        id = [];

    this.permissionsTree.forEach(permission=>{
      permission.children.forEach(child=>{

        if (child.isChecked) {
          id.push(child.id);
          model.set('permissions', id);
        }
      });
    });
  }

  @action
  permissionCheck() {
    let checked = [];

    this.permissionsTree.forEach(permission=>{

      if (permission.isChecked) {
        checked = permission.id;
      }
    });

    if (checked.length > 1) {
      this.send('presetAttrs');
    } else {
      this.ajaxStart();

      this.ajaxError('Need at lease one permissions.');
      throw new Error('Need at lease one permissions.');
    }
  }
}
