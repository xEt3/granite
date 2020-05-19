import Controller from 'granite/core/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import Model from 'ember-data/model';
import { inject as service } from '@ember/service';

export default class AccountEmployeeDocumentsNewController extends Controller {
  @service data
  @tracked assignments = [];
  @tracked docModalSelection = [];

  saveOptions = {
    transitionAfterSave: 'account.employee.index.documents',
    transitionWithModel: false
  }

  @action
  saveAssignment () {
    for (let i = 0; i < this.assignments.length; i++) {
      let { effectiveOn, signatureRequired, visibleToEmployee  } = this.assignments[i];

      this.assignments[i].setProperties({
        signatureRequired,
        visibleToEmployee,
        effectiveOn
      });

      this.data.saveRecord(this.assignments[i], 'working', this.saveOptions);
    }
    this.assignments = [];
  }

  @action
  async addAssignment (files) {
    let model = this.model;
    const makeAssignment = (inputFile) => {

      let file = inputFile;

      if (!(file instanceof Model)) {
        this.store.pushPayload('file', { file });
        file = this.store.peekRecord('file', file.id);
      }

      let { employee, company, followups } = model;

      let assignment = this.store.createRecord('file-assignment', {
        file,
        company,
        employee,
        followups
      });
      this.assignments.pushObject(assignment);
    };

    let _files = Array.isArray(files) ? files : [ files ];

    let { error } = this.data.createStatus();

    for (let i = 0; i < _files.length; i++) {
      try {
        await makeAssignment(_files[i]);
      } catch (e) {
        error(e);
      }
    }

    this.docModalSelection = [];
  }

  @action
  async removeAssignment (assignment) {
    await assignment.destroyRecord();
    this.assignments.removeObject(assignment);
  }
}
