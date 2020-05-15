import { action } from '@ember/object';
import Route from 'granite/core/route';

export default class IndexRoute extends Route {
  @action
  refresh () {
    return true;
  }
}
