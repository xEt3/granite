import { GraniteResourceRoute } from 'granite/core/route';

export default class AccountEmployeesFormsResponsesRoute extends GraniteResourceRoute {
  modelName = 'form-response'

  titleToken (model) {
    return `Responses for ${model.form.name}`;
  }

  async model ({ form_id }) {
    this.set('query', { form: form_id });
    const responses = await super.model(...arguments);
    return {
      responses,
      form: await this.store.find('form', form_id)
    };
  }

  setupController (controller, model) {
    controller.setProperties({
      model: model.responses,
      form:  model.form
    });
  }
}
