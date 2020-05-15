import Route from 'granite/core/route';

export default class AccountAnatomyLocationEditRoute extends Route {
  titleToken (model) {
    return `Edit ${model.name}`;
  }

  model ({ location_id }) {
    return this.store.find('location', location_id);
  }
}
