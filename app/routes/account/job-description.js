import Route from 'granite/core/route';

export default class JobDescriptionRoute extends Route {
  model (params) {
    return this.store.find('job', params.id);
  }
}
