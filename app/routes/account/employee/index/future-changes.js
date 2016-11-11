import Ember from 'ember';
import refreshable from 'granite/mixins/refreshable';

const { RSVP } = Ember;
export default Ember.Route.extend(refreshable, {
  model() {
    let employee = this.modelFor('account.employee');
    return RSVP.hash({
      pendingChanges: this.store.query('history', { 'targetId': employee.get('id'), 'effectiveOn': { $gt: moment().add(1, 'minute').toDate() } } )
    });
  },
  setupController ( controller, model ) {
    controller.setProperties({
      model: model.pendingChanges
    });
  }
});
