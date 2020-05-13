import Route from 'granite/core/route';

export default class EditRoute extends Route {
  model (params) {
    return this.store.find('department', params.department_id);
  }
}
