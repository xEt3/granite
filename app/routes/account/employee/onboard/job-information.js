import Ember from 'ember';
import addEdit from 'granite/mixins/controller-abstractions/add-edit';

const { RSVP, inject } = Ember;

export default Ember.Route.extend(addEdit,{

  auth: inject.service(),

  model() {
    let employee = this.modelFor('account.employee.onboard.start'),
        company = this.get('auth.user.company'),
        companyId = company.get('id'),
        departments = this.store.query('department', { 'company': companyId }),
        locations = this.store.query('location', { 'company': companyId });

    return RSVP.hash({
      employee,
      company,
      departments,
      locations

    });
  },

  setupController ( controller, model ) {
    this._super(controller, model);
    controller.setProperties({
      model: model.employee,
      company: model.company,
      departments: model.departments,
      locations: model.locations
    });
  }
});
