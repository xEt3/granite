import Route from '@ember/routing/route';
import resource from 'granite/mixins/route-abstractions/resource';

export default Route.extend(resource, {
  titleToken:  'Talent Pool',
  modelName:   'applicant',
  resourceUrl: '/api/v1/applicants',

  query: { '$report': 'talentPoolSummary' },

  mutateQuery (q) {
    let jobOpening = this.modelFor('account.job-opening');
    q['talentPools.job'] = jobOpening && jobOpening.belongsTo('job').id();
  }
});
