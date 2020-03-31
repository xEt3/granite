import { GraniteResourceRoute } from 'granite/core/route';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class AccountEmployeesChangesRoute extends GraniteResourceRoute {
  @service auth
  titleToken = 'Changes'
  modelName = 'change'

  query = {
    '$report':  'changeList',
    reviewedOn: { $not: { $type: 9 } }
  }

  sort = { created: -1 }

  @action
  refresh () {
    return true;
  }
}
