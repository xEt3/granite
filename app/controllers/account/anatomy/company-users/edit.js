import Controller from '@ember/controller';
import addEdit from 'granite/mixins/controller-abstractions/add-edit';

export default Controller.extend(addEdit, {
  transitionAfterSave: 'account.anatomy.company-users',
  transitionWithModel: false,

  actions: {
    presetAttrs () {
      let model = this.get('model'),
          id = [];

      this.permissionsTree.forEach(permission=>{
        permission.children.forEach(child=>{

          if (child.isChecked) {
            id.push(child.id);
            model.set('permissions', id);
          }
        });
      });
    },

    permissionCheck () {
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
});
