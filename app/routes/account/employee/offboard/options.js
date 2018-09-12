import Route from '@ember/routing/route';

export default Route.extend({
  titleToken: 'Options',

  setupController (controller, model) {
    if (!model.get('finalAddressLine1')) {
      model.setProperties({
        finalAddressLine1: model.get('addressLine1'),
        finalAddressLine2: model.get('addressLine2'),
        finalAddressCity:  model.get('addressCity'),
        finalAddressZip:   model.get('addressZip'),
        finalAddressState: model.get('addressState')
      });
    }

    this._super(...arguments);
  }
});
