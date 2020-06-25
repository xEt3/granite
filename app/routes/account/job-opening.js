import Route from 'granite/core/route';

export default class JobOpeningRoute extends Route {
  titleToken (model) {
    return model.get('title');
  }

  model (params) {
    return this.store.find('job-opening', params.id);
  }
}
