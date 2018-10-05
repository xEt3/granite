import Route from '@ember/routing/route';
import { hash } from 'rsvp';
import refreshable from 'granite/mixins/refreshable';

export default Route.extend(refreshable, {
  model () {
    let document = this.modelFor('account.document');

    return hash({
      document,
      fileAssignments: this.store.query('fileAssignment', { file: document.id }),
      employees:       this.store.findAll('employee')
    });
  },

  setupController (controller, model) {
    controller.setProperties({
      model:           model.document,
      fileAssignments: model.fileAssignments,
      employees:       model.employees
    });
  }
});

//COPY NEEDED THINGS TO /ACCOUNT/DOCUMENT
