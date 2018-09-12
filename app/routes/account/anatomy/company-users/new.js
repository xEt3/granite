import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import { A } from '@ember/array';
import { inject as service } from '@ember/service';
import add from 'granite/mixins/route-abstractions/add';

const crud = [ 'create', 'read', 'update', 'delete' ],
      nodeDefaults = {
        isExpanded: false,
        isSelected: false,
        isChecked:  false,
        isVisible:  true
      };

export default Route.extend(add, {
  titleToken: 'New User',
  auth:       service(),
  modelName:  'company-user',

  getModelDefaults () {
    return { company: this.get('auth.user.company') };
  },

  model () {
    return RSVP.hash({
      permissions: this.store.findAll('permission'),
      user:        this._super(...arguments),
      employees:   this.store.query('employee', { _id: { $ne: this.get('auth.user.employee.id') } })
    });
  },

  setupController (controller, model) {
    controller.setProperties({
      model:           model.user,
      employees:       model.employees,
      permissions:     model.permissions,
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
          }, nodeDefaults)
        );

        return parents;
      }, A()).toArray()
    });
  }
});
