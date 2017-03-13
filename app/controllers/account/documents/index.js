import Ember from 'ember';
import ajaxStatus from 'granite/mixins/ajax-status';
import pagination from 'granite/mixins/controller-abstractions/pagination';
import addEdit from 'granite/mixins/controller-abstractions/add-edit';

const {
  Controller,
  computed,
  inject: { service },
  RSVP: { Promise }
} = Ember;

export default Controller.extend(ajaxStatus, pagination, addEdit, {
  auth: service(),

  queryParams: [ 'page', 'asc', 'sortProp' ],
  limit: 20,
  page: 1,
  asc: true,
  sortProp: 'created',
  enableNotify: true,

  fileAssignmentForm: computed(() => [{
    label: 'Assign to',
    type: 'select',
    inputClass: 'multiple search',
    path: 'employees',
    contentPath: 'controller.employees',
    displayKey: 'fullName',
    selectText: 'Select one or multiple'
  }, {
    label: 'Your message (optional)',
    type: 'textarea',
    rows: '6',
    path: 'message'
  }, {
    label: 'Require a signature',
    type: 'checkbox',
    path: 'signatureRequired'
  }]),

  createFileAssignment () {
    if (this.get('fileAssignment')) {
      this.get('fileAssignment').destroyRecord();
    }

    let assignment = this.store.createRecord('file-assignment', {
      file: this.get('assigningDocument'),
      creator: this.get('auth.user.employee')
    });

    this.set('fileAssignment', assignment);
    return assignment;
  },

  afterSave () {
    this.set('fileAssignment', null);
  },

  remapToModels (assignment) {
    let employees = assignment.get('employees');

    if (employees.get('length') === 1) {
      return assignment;
    }

    assignment.set('employee', employees.get('firstObject'));

    let assignmentPojo = assignment.getProperties('file', 'creator', 'company', 'signatureRequired', 'message');

    return [ assignment, ...(employees.slice(1).map(employee => {
      return this.store.createRecord('file-assignment', Ember.$.extend({ employee }, assignmentPojo));
    }))];
  },

  actions: {
    openAssignmentModal (file) {
      this.setProperties({
        respondedAssignment: false,
        assigningDocument: file
      });

      this.createFileAssignment();

      Ember.$('#modal__file-assignment').modal({
        detachable: true,
        onHidden: () => {
          if ( !this.get('respondedAssignment') ) {
            this.send('respondedAssignment', false);

          }
        }
      }).modal('show');

      return new Promise((resolveAssignment, rejectAssignment) => this.setProperties({
        resolveAssignment,
        rejectAssignment
      }));
    },

    respondAssignment (response) {
      this.get(response ? 'resolveAssignment' : 'rejectAssignment')(response ? this.get('fileAssignment') : null);
      this.set('respondedAssignment', true);
      this.send('closeAssignmentModal');
    },

    closeAssignmentModal () {
      Ember.$('#modal__file-assignment').modal('hide');
    }
  }
});
