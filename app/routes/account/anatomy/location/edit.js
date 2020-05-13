import Route from 'granite/core/route';

export default class EditRoute extends Route {
  model ({ location_id }) {
    return this.store.find('location', location_id);
  }
}
