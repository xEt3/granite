import Controller from '@ember/controller';

export default class PurchaseController extends Controller {
  queryParams = [ 'idempotencyKey' ]
}
