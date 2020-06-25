import Route from 'granite/core/route';

export default class TemplatesRoute extends Route {
  titleToken = 'Templates';

  async model () {
    return {
      templates:   await this.store.query('template', {}),
      definitions: await this.store.findAll('template-definition')
    };
  }
}
