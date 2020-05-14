import Controller from 'granite/core/controller';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

// SOMETHING BROKEN ON SAVE

export default class AccountAnatomyCompanyUsersNewController extends Controller {
  @service data

  @tracked employees
  @tracked permissionsTree

  saveOptions = {
    transitionAfterSave: 'account.anatomy.company-users',
    transitionWithModel: false
  }

  get disableForm () {
    let model = this.model;
    return !model.email || !model.employee;
  }

  @action
  async save () {
    let model = this.model,
        employee = await this.model.employee,
        user = await this.data.saveRecord(model);

    employee.companyUser = user;
    await this.data.saveRecord(employee);
  }

  @action
  presetAttrs () {
    let model = this.model,
        employee = this.model.employee,
        attrs = [ 'firstName', 'middleName', 'lastName' ];

    let id = [];
    this.permissionsTree.forEach(permission=>{
      permission.children.forEach(child=>{
        if (child.isChecked) {
          id.push(child.id);
          model.permissions = id;
        }
      });
    });

    attrs.map(a => {
      model.a = employee.get(a);
    });
  }
}
