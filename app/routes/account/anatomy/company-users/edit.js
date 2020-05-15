import Route from 'granite/core/route';
import { A } from '@ember/array';

const crud = [ 'create', 'read', 'update', 'delete' ],
      nodeDefaults = {
        isExpanded: false,
        isSelected: false,
        isChecked:  false,
        isVisible:  true
      };

export default class AccountAnatomyCompanyUsersEditRoute extends Route {
  titleToken (model) {
    return `Edit ${model.user.fullName}`;
  }

  async model (params) {
    return {
      user:        await this.store.findRecord('company-user', params.user_id),
      permissions: await this.store.findAll('permission')
    };
  }

  setupController (controller, model) {
    Object.assign(controller, {
      model:           model.user,
      permission:      model.permissions,
      permissionsTree: model.permissions.toArray().reduce((parents, permission) => {
        let { id, key } = permission,
            verb = key.split(' ').shift();
        verb = crud.includes(verb) ? verb : 'other';

        if (!parents.findBy('name', verb)) {
          parents.push(Object.assign({
            id:       verb,
            name:     verb,
            children: []
          }, nodeDefaults));
        }

        parents.findBy('name', verb).children.push(
          Object.assign({
            id,
            name: key
          }, nodeDefaults, { isChecked: model.user.permissions.includes(id) })
        );

        return parents;
      }, A()).toArray()
    });
  }
}
