import { GraniteResourceRoute } from 'granite/core/route';

export default class AccountJobOpeningCampaignTalentPoolRoute extends GraniteResourceRoute {
  titleToken  = 'Talent Pool'
  modelName   =  'applicant'
  resourceUrl = '/api/v1/applicants'

  query = { '$report': 'talentPoolSummary' }

  mutateQuery (q) {
    let jobOpening = this.modelFor('account.job-opening');
    q['talentPools.job'] = jobOpening && jobOpening.belongsTo('job').id();
  }
}
