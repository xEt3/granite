import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';

@classic
export default class RenewalRoute extends Route {
  queryParams = { renewal: { refreshModel: true } };

  model({ renewal }) {
    let certification = this.modelFor('account.employee.index.education.certification');

    return {
      certification,
      renewal: renewal ?
        certification.renewals.findBy('id', renewal) :
        this.store.createRecord('renewal')
    };
  }
}
