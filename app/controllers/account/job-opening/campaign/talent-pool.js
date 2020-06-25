import { GraniteResourceController } from 'granite/core/controller';

export default class AccountJobOpeningCampaignTalentPoolController extends GraniteResourceController {
  get pages () {
    return Math.ceil(this.model.length / this.limit);
  }
}
