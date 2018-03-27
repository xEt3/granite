import Route from '@ember/routing/route';

export default Route.extend({

  setupController(model, controller) {
    this._super(controller, model)
    controller.setProperties({
      finalAddressLine1: model.get('addressLine1'),
      finalAddressLine2: model.get('addressLine2'),
      finalAddressCity: model.get('addressCity'),
      finalAddressZip: model.get('addressZip'),
      finalAddressState: model.get('addressState')
    })
  }
});
