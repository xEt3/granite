import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';
import RSVP from 'rsvp';

@classic
export default class TodoRoute extends Route {
  titleToken = 'Todos';

  model () {
    return RSVP.hash({
      actionItem:  super.model(...arguments),
      actionItems: this.store.query('action-item', {
        completedOn: { $not: { $type: 9 } },
        cancelledOn: { $not: { $type: 9 } }
      }),
      employees: this.store.findAll('employee')
    });
  }

  setupController (controller, model) {
    controller.setProperties({
      model:       model.actionItem,
      actionItems: model.actionItems,
      employees:   model.employees
    });
  }
}
