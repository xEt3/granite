import Controller from 'granite/core/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class AccountAnatomyCompanyUsersEditController extends Controller {
  @service data

  saveOptions = {
    transitionAfterSave: 'account.anatomy.company-users',
    transitionWithModel: false
  }

  @action
  presetAttrs () {
    let model = this.model,
        id = [];

    this.permissionsTree.forEach(permission=>{
      permission.children.forEach(child=>{

        if (child.isChecked) {
          id.push(child.id);
          model.permissions = id;
        }
      });
    });
  }

  @action
  permissionCheck () {
    let checked = [];

    // console.log('this.permissionsTree:', this.permissionsTree);

    this.permissionsTree.forEach(permission=>{
      console.log('permission:', permission);

      if (permission.isChecked) {
        checked = permission.id;
      } else {
        permission.children.forEach(child => {
          checked = child.id;
        });
      }
    });

    if (checked.length > 1) {
      this.presetAttrs();
    } else {
      let { error } = this.data.createStatus();

      error('Need at lease one permissions.');
      throw new Error('Need at lease one permissions.');
    }
  }
}
