import Controller from 'granite/core/controller';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import Model from 'ember-data/model';

export default class AccountEmployeeOnboardDocumentsController extends Controller {
  @service data
  @tracked assignments

  get suggestedDocumentsFiltered () {
    let assignments = this.assignments;

    return this.suggestedDocuments.filter((sug) => {
      let sugId = sug.file.id || sug.file._id;

      return !assignments.find(assignment => {
        let fileId = assignment.belongsTo('file').id();
        return fileId && fileId === sugId;
      });
    });
  }

  get onboardingDocumentsFiltered ()  {
    let assignments = this.assignments;

    return this.onboardingDocuments.filter((file) =>
      !assignments.find(assignment =>
        assignment.belongsTo('file').id() === file.id));
  }

  @action
  async addAssignment (files) {
    const makeAssignment = (inputFile) => {
      let file = inputFile;

      if (!(file instanceof Model)) {
        this.store.pushPayload('file', { file });
        file = this.store.peekRecord('file', file.id);
      }

      let assignment = this.store.createRecord('file-assignment', {
        file,
        fileType:          'Onboarding',
        employee:          this.get('employee'),
        visibleToEmployee: true
      });

      this.assignments.pushObject(assignment);

      return this.data.saveRecord(assignment, 'assignment', { notify: false });
    };

    let _files = Array.isArray(files) ? files : [ files ];


    for (let i = 0; i < _files.length; i++) {
      let { success, error } = this.data.createStatus();
      try {
        await makeAssignment(_files[i]);
        success(null, true);
      } catch (e) {
        error(e);
      }
    }

    this.docModalSelection = [];
  }

  @action
  saveAssignmentChanges (assignment) {
    this.data.saveRecord(assignment, 'assignment', { notify: false });
  }

  @action
  async removeAssignment (assignment) {
    await assignment.destroyRecord();
    this.assignments.removeObject(assignment);
  }
}
