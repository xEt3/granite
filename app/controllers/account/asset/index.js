import Controller from 'granite/core/controller';
import { equal } from '@ember/object/computed';
import { inject as service } from '@ember/service';

export default class AccountAssetController extends Controller {
  @service data

  queryParams = [ 'page' ]
  limit = 10

  @equal('application.currentPath', 'account.asset.index.new') addingAsset
  @equal('application.currentPath', 'account.asset.index.edit') editAsset
}
