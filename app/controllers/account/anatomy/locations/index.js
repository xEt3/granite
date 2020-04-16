import Controller from 'granite/core/controller';
import { equal } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import { inject as controller } from '@ember/controller';

export default class AccountAnatomyLocationsController extends Controller {
  @service data
  @controller application

  @equal('application.currentPath', 'account.anatomy.locations.index.new') addingLocation
  queryParams =    [ 'page' ]
  limit =          20
}
