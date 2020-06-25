import Route from 'granite/core/route';
import { get } from '@ember/object';
const employeeBelongsTo = [ 'location', 'department', 'supervisor', 'jobDescription' ];

export default class AccountEmployeeEditRoute extends Route {
  titleToken = 'Edit information'
  routeType = 'edit'

  model () {
    return this.modelFor('account.employee');
  }

  setupController (controller, model) {
    controller.setProperties({
      model,
      currentDepartment:    model.department,
      initialRelationships: employeeBelongsTo.map(relationshipPath => {
        return {
          relationshipPath,
          id: get(model, `${relationshipPath}.id`)
        };
      })
    });
  }
}
