import Route from 'granite/core/route';

export default class AccountEmployeeRoute extends Route {
  titleToken (model) {
    return model.fullName;
  }

  model (params) {
    return this.store.find('employee', params.id);
  }
}
