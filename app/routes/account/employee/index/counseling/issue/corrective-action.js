import Route from 'granite/core/route';

export default class CorrectiveActionRoute extends Route {
  model (params) {
    return this.store.find('corrective-action', params.action_id);
  }
}
