import Controller from '@ember/controller';
import { computed } from '@ember/object';
import addEdit from 'granite/mixins/controller-abstractions/add-edit';

export default Controller.extend(addEdit, {
  enableNotify: false,

  offboardingDocumentsFiltered: computed('offboardingDocuments', 'assignments.[]', function () {
    let assignments = this.get('assignments');

    return this.get('offboardingDocuments').filter((file) =>
      !assignments.find(assignment =>
        assignment.belongsTo('file').id() === file.get('id')));
  }),

  actions: {
    async addAssignment (files) {
      const makeAssignment = (file) => {
        let assignment = this.store.createRecord('file-assignment', {
          file,
          employee:          this.get('employee'),
          visibleToEmployee: true
        });

        this.assignments.pushObject(assignment);

        return this.saveModel(assignment);
      };

      let _files = Array.isArray(files) ? files : [ files ];

      for (let i = 0; i < _files.length; i++) {
        try {
          await makeAssignment(_files[i]);
        } catch (e) {
          this.set('enableNotify', true);
          this.ajaxError(e);
          this.set('enableNotify', false);
        }
      }

      this.set('docModalSelection', []);
    },

    saveAssignmentChanges (assignment) {
      this.saveModel(assignment);
    },

    async removeAssignment (assignment) {
      await assignment.destroyRecord();
      this.assignments.removeObject(assignment);
    }
  }
});
