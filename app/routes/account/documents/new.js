import Route from 'granite/core/route';
import { Promise } from 'rsvp';
import { inject as service } from '@ember/service';

export default class AccountDocumentsNewRoute extends Route {
  @service auth
  titleToken = 'New Document'
  routeType = 'add'

  model () {
    return Promise.resolve();
  }
}
