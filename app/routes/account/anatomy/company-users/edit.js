import Route from '@ember/routing/route';
import { A } from '@ember/array';
import RSVP from 'rsvp';

const crud = [ 'create', 'read', 'update', 'delete' ],
      nodeDefaults = {
        isExpanded: false,
        isSelected: false,
        isChecked:  false,
        isVisible:  true
      };

export default Route.extend({
  model (params) {
    return RSVP.hash({
      user:        this.store.findRecord('company-user', params.user_id),
      permissions: this.store.findAll('permission')
    });
  },

  setupController (controller, model) {
    controller.setProperties({
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
          }, nodeDefaults, { isChecked: model.user.get('permissions').includes(id) })
        );

        return parents;
      }, A()).toArray()
    });
  }
});
