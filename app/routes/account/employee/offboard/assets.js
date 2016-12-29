import Ember from 'ember';
import refreshable from 'granite/mixins/refreshable';

const { Route, RSVP } = Ember;

export default Route.extend(refreshable, {
  model () {
    let employee = this.modelFor('account.employee.offboard');

    return RSVP.hash({
      employee,
      assetItems: this.store.query('asset-item', {
        'assignments.employee': employee.get('id')
      }).then(assets => assets.toArray())
    });
  },

  setupController (controller, model) {
    controller.setProperties({
      model: model.assetItems,
      employee: model.employee
    });
  }
});
