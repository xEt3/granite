import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import refreshable from 'granite/mixins/refreshable';
import moment from 'moment';

@classic
export default class FutureChangesRoute extends Route.extend(refreshable) {
  titleToken = 'Future Changes';

  model () {
    let employee = this.modelFor('account.employee');
    return RSVP.hash({
      pendingChanges: this.store.query('history', {
        'targetId':    employee.get('id'),
        'effectiveOn': { $gt: moment().add(1, 'minute').toDate() }
      })
    });
  }

  setupController (controller, model) {
    controller.setProperties({ model: model.pendingChanges });
  }
}
