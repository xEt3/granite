import Route from 'granite/core/route';

export default class CertificationRoute extends Route {
  titleToken (model) {
    return model.name;
  }

  async model ({ certification_id }) {
    return this.store.find('certification', certification_id);
  }
}
