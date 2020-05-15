import Route from 'granite/core/route';

export default class EventRoute extends Route {
  model (params) {
    return this.store.find('event', params.event_id);
  }
}
