import Controller from 'granite/core/controller';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class AccountEmployeeOffboardDocumentsController extends Controller {
  @service data

  @tracked offboardingDocuments
  @tracked assignments

  get offboardingDocumentsFiltered () {
    let assignments = this.assignments;

    return this.offboardingDocuments.filter((file) =>
      !assignments.find(assignment =>
        assignment.belongsTo('file').id() === file.id));
  }

  @action
  async addAssignment (files) {
    const makeAssignment = (file) => {
      let assignment = this.store.createRecord('file-assignment', {
        file,
        employee:          this.employee,
        visibleToEmployee: true
      });

      this.assignments.pushObject(assignment);

      return this.data.saveRecord(assignment, 'assignmentWorking', { notify: false });
    };

    let _files = Array.isArray(files) ? files : [ files ];

    for (let i = 0; i < _files.length; i++) {
      try {
        await makeAssignment(_files[i]);
      } catch (e) {
        this.data.ajaxError({
          label:  'working',
          notify: true
        }, e);
      }
    }

    this.set('docModalSelection', []);
  }

  @action
  async saveAssignmentChanges (assignment) {
    await this.data.saveRecord(assignment, 'assignmentWorking', { notify: false });
  }

  @action
  async removeAssignment (assignment) {
    await assignment.destroyRecord();
    this.assignments.removeObject(assignment);
  }
}
