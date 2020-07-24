import Route from 'granite/core/route';
import { carriers } from 'granite/config';

export default class IntegrationsRoute extends Route {
  titleToken = 'Integrations';

  model () {
    return carriers;
  }
}
