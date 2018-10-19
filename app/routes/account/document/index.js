import Route from '@ember/routing/route';
import { hash } from 'rsvp';
import refreshable from 'granite/mixins/refreshable';

export default Route.extend(refreshable, {
  titleToken () {
    return 'Document';
  },

  model () {
    let { document } = this.modelFor('account.document');

    return hash({
      document,
      fileAssignments: this.store.query('fileAssignment', {
        file: document.id,
        sort: {
          readOn:   -1,
          signedOn: -1
        }
      })
    });
  },

  setupController (controller, model) {
    controller.setProperties({
      model:           model.document,
      fileAssignments: model.fileAssignments
    });
  }
});
