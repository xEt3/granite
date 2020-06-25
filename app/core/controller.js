import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default class GraniteController extends Controller {
  @service auth
}

export class GraniteResourceController extends GraniteController {
  queryParams = [ 'page', 'limit' ]
  limit       = 20
  page        = 1
}
