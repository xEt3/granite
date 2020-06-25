import Route from 'granite/core/route';

export default class IndexRoute extends Route {
  titleToken (model) {
    return 'Job - ' + model.title;
  }
}
