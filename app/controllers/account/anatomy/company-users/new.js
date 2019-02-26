import Controller from '@ember/controller';
import { computed } from '@ember/object';
import addEdit from 'granite/mixins/controller-abstractions/add-edit';

export default Controller.extend(addEdit, {
  transitionAfterSave: 'account.anatomy.company-users',
  transitionWithModel: false,

  disableForm: computed('model.{email,employee}', function () {
    let model = this.get('model');
    return !model.get('email') || !model.get('employee');
  }),

  actions: {
    async save () {
      let model = this.get('model'),
          employee = await this.get('model.employee'),
          user = await this.saveModel(model);

      employee.set('companyUser', user);
      await this.saveModel(employee);
    },

    presetAttrs () {
      let model = this.get('model'),
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
});
