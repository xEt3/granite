import Route from 'granite/core/route';

export default class CustomFieldsRoute extends Route {
  titleToken = 'Edit Custom Fields'

  setupController (controller) {
    super.setupController(...arguments);
    controller.updateCustomFields();
  }
}
