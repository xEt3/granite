import Route from 'granite/core/route';
import { inject as service } from '@ember/service';

export default class AccountSettingsTemplatesAddRoute extends Route {
  @service auth
  @service ajax
  titleToken = 'Add Templates'
  modelName =  'template'
  routeType = 'add'

  async getModelDefaults (params) {
    let { template } = await this.ajax.request(`/api/v1/template/${params.template_key}/default`);
    const { content } = template,
          { isRenderable } = this.definition;

    return {
      key: params.template_key,
      isRenderable,
      content
    };
  }

  async model (params) {
    let definition = await this.store.query('template-definition', { key: params.template_key });
    this.definition = definition.firstObject;

    return {
      definition,
      template: await super.model(params)
    };
  }

  setupController (controller, model) {
    controller.setProperties({
      model:      model.template,
      definition: model.definition.firstObject
    });
  }
}
