import Route from '@ember/routing/route';

export default Route.extend({
  setupController (controller, model) {
    this._super(...arguments)
    controller.setProperties({
      finalAddressLine1: model.addressLine1,
      finalAddressLine2: model.addressLine2,
      finalAddressCity: model.addressCity,
      finalAddressZip: model.addressZip,
      finalAddressState: model.addressState
    });
  }
});
