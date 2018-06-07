import Route from '@ember/routing/route';
import edit from 'granite/mixins/route-abstractions/edit';

export default Route.extend(edit, {
  model () {
    return this.modelFor('account.employee');
  },

  setupController (controller, model) {
    controller.setProperties({
      currentDepartment: model.department
    });
  }
});
