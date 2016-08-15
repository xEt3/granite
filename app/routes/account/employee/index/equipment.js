import Ember from 'ember';

const { RSVP } = Ember;

export default Ember.Route.extend({
  model () {
    let employee = this.modelFor('account.employee');
    return RSVP.hash({
      assetItems: this.store.query('asset-item', { 'assignments.employee': employee.get('id') }),
      employee
    });

  },
  setupController ( controller, model ) {
    controller.setProperties({
      model: model.assetItems,
      employee: model.employee
    });
  }
});
