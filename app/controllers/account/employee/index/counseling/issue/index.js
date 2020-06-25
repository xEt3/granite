import { GraniteResourceController } from 'granite/core/controller';
import { inject as service } from '@ember/service';

export default class AccountEmployeeCounselingIssueController extends GraniteResourceController {
  @service auth;
}
