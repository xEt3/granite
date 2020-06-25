import Route from 'granite/core/route';

export default class RecoverRoute extends Route {
  titleToken = 'Recover Account'

  model (params) {
    return params.recovery_id;
  }
}
