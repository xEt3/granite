import Route from '@ember/routing/route';

export default Route.extend({
  queryParams: { renewal: { refreshModel: true } },

  model ({ renewal }) {
    let certification = this.modelFor('account.employee.index.education.certification');

    return {
      certification,
      renewal: renewal ?
        certification.renewals.findBy('id', renewal) :
        this.store.createRecord('renewal')
    };
  }
});
