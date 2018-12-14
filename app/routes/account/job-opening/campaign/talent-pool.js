import Route from '@ember/routing/route';
import resource from 'granite/mixins/route-abstractions/resource';

export default Route.extend(resource, {
  titleToken: 'Talent Pool',
  modelName:  'applicant',

  async mutateQuery (q) {
    console.log('mutate query has been called');
    let company = (await this.auth.get('user.company')).get('id');
    console.log(company);

    q['talentPools.company'] = company;
  }
});
