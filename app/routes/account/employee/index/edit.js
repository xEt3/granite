import Route from '@ember/routing/route';
import edit from 'granite/mixins/route-abstractions/edit';
const employeeBelongsTo = [ 'location', 'department', 'supervisor' ];

export default Route.extend(edit, {
  model () {
    return this.modelFor('account.employee');
  },

  setupController (controller, model) {
    controller.setProperties({
      model: model,
      currentDepartment: model.department,
      initialRelationships: employeeBelongsTo.map(relationshipPath => {
        return {
          id: model.get(`${relationshipPath}.id`),
          relationshipPath
        }
      })
    });
  }
});
