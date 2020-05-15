import Route from 'granite/core/route';

export default class DocumentRoute extends Route {
  title (tokens) {
    return tokens.join(' - ') + ' - ' + this.context.document.title + ' - Granite HR';
  }

  async model (params) {
    return {
      document:  await this.store.find('file', params.id),
      employees: await this.store.findAll('employee')
    };
  }

  setupController (controller, model) {
    Object.assign(controller, {
      model:     model.document,
      employees: model.employees
    });
  }
}
