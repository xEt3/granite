import Route from 'granite/core/route';

export default class AccountSettingsTemplateEditRoute extends Route {
  titleToken = 'Edit'
  modelName =  'template'
  segmentKey = 'template_id'
  routeType = 'edit'

  async model () {
    let template = await super.model(...arguments);
    let definition = await this.store.query('template-definition', { key: template.key });
    return {
      template,
      definition: definition.firstObject
    };
  }

  setupController (controller, model) {
    controller.setProperties({
      model:      model.template,
      definition: model.definition
    });
  }
}
