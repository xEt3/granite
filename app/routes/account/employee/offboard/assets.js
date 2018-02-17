import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import refreshable from 'granite/mixins/refreshable';

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
