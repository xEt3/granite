import classic from 'ember-classic-decorator';
import { action, computed } from '@ember/object';
import Controller from '@ember/controller';
import addEdit from 'granite/mixins/controller-abstractions/add-edit';

@classic
export default class NewController extends Controller.extend(addEdit) {
  transitionAfterSave = 'account.anatomy.company-users';
  transitionWithModel = false;

  @computed('model.{email,employee}')
  get disableForm() {
    let model = this.model;
    return !model.get('email') || !model.get('employee');
  }

  @action
  async save() {
    let model = this.model,
        employee = await this.get('model.employee'),
        user = await this.saveModel(model);

    employee.set('companyUser', user);
    await this.saveModel(employee);
  }

  @action
  presetAttrs() {
    let model = this.model,
        employee = this.get('model.employee'),
        attrs = [ 'firstName', 'middleName', 'lastName' ];

    let id = [];
    this.permissionsTree.forEach(permission=>{
      permission.children.forEach(child=>{
        if (child.isChecked) {
          id.push(child.id);
          model.set('permissions', id);
        }
      });
    });

    attrs.map(a => model.set(a, employee.get(a)));
  }
}
