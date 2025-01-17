import Route from 'granite/core/route';
import { A } from '@ember/array';
import { inject as service } from '@ember/service';

const crud = [ 'create', 'read', 'update', 'delete' ],
      nodeDefaults = {
        isExpanded: false,
        isSelected: false,
        isChecked:  false,
        isVisible:  true
      };

export default class AccountAnatomyCompanyUsersNewRoute extends Route {
  @service auth
  titleToken = 'New User'
  modelName =  'company-user'
  routeType = 'add'

  getModelDefaults () {
    return { company: this.auth.get('user.company') };
  }

  async model () {
    return {
      permissions: await this.store.findAll('permission'),
      user:        await super.model(...arguments),
      employees:   await this.store.query('employee', { _id: { $ne: this.auth.get('user.employee.id') } })
    };
  }

  setupController (controller, model) {
    controller.model = model.user;
    controller.employees = model.employees;
    controller.permissions = model.permissions;
    controller.permissionsTree = model.permissions.toArray().reduce((parents, permission) => {
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
        }, nodeDefaults)
      );

      return parents;
    }, A()).toArray();
  }
}
