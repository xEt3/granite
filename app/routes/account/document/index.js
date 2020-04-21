import Route from 'granite/core/route';

export default class AccountDocumentRoute extends Route {
  titleToken = 'Document'

  async model () {
    let { document } = this.modelFor('account.document');

    return {
      document,
      fileAssignments: await this.store.query('fileAssignment', {
        file: document.id,
        sort: {
          readOn:   -1,
          signedOn: -1
        }
      })
    };
  }

  setupController (controller, model) {
    controller.setProperties({
      model:           model.document,
      fileAssignments: model.fileAssignments
    });
  }
}
