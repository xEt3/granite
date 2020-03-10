import Controller from '@ember/controller';
import { computed } from '@ember/object';
import Model from 'ember-data/model';
import addEdit from 'granite/mixins/controller-abstractions/add-edit';

export default Controller.extend(addEdit, {
  enableNotify: false,

  suggestedDocumentsFiltered: computed('suggestedDocuments', 'assignments.[]', function () {
    let assignments = this.get('assignments');

    return this.get('suggestedDocuments').filter((sug) => {
      let sugId = sug.file.id || sug.file._id;

      return !assignments.find(assignment => {
        let fileId = assignment.belongsTo('file').id();
        return fileId && fileId === sugId;
      });
    });
  }),

  onboardingDocumentsFiltered: computed('onboardingDocuments', 'assignments.[]', function () {
    let assignments = this.get('assignments');

    return this.get('onboardingDocuments').filter((file) =>
      !assignments.find(assignment =>
        assignment.belongsTo('file').id() === file.get('id')));
  }),

  actions: {
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
