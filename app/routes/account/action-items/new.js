import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import RSVP from 'rsvp';
import add from 'granite/mixins/route-abstractions/add';

export default Route.extend(add, {
  titleToken: 'New Action Item',
  auth:       service(),
  modelName:  'action-item',

  getModelDefaults () {
    return {
      owner:   this.get('auth.user.employee'),
      company: this.get('auth.user.company')
    };
  },

  model () {
    return RSVP.hash({
      actionItem:  this._super(...arguments),
      actionItems: this.store.query('action-item', {
        completedOn: { $not: { $type: 9 } },
        cancelledOn: { $not: { $type: 9 } }
      }),
      employees: this.store.findAll('employee')
    });
  },

  setupController (controller, model) {
    controller.setProperties({
      model:       model.actionItem,
      actionItems: model.actionItems,
      employees:   model.employees
    });
  }
});
