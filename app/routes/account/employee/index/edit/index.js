import Route from '@ember/routing/route';

export default Route.extend({
  titleToken: 'Edit Personal',

  setupController (controller, model) {
    controller.setProperties({
      model,
      initialDateOfBirth: model.dateOfBirth
    });
  }
});
