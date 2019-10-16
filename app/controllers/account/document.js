import Controller from '@ember/controller';
import { Promise } from 'rsvp';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import addEdit from 'granite/mixins/controller-abstractions/add-edit';
import $ from 'jquery';

export default Controller.extend(addEdit, {
  auth:       service(),
  isExpanded: false,

  fileAssignmentForm: computed(() => [{
    label:       'Assign to',
    type:        'select',
    inputClass:  'multiple search',
    path:        'employees',
    contentPath: 'controller.employees',
    displayKey:  'fullName',
    selectText:  'Select one or multiple'
  }, {
    label: 'Your message (optional)',
    type:  'textarea',
    rows:  '6',
    path:  'message'
  }, {
    label: 'Visible to employee',
    type:  'checkbox',
    path:  'visibleToEmployee'
  }, {
    label: 'Require a signature',
    type:  'checkbox',
    path:  'signatureRequired'
  }]),

  imagePreview: computed.match('model.extension', /je?pg|png|gif/i),

  createFileAssignment () {
    if (this.get('fileAssignment')) {
      this.get('fileAssignment').destroyRecord();
    }

    let assignment = this.store.createRecord('file-assignment', {
      file:    this.get('model'),
      creator: this.get('auth.user.employee')
    });

    this.set('fileAssignment', assignment);
    return assignment;
  },

  afterSave () {
    this.set('fileAssignment', null);
    this.set('model.effectiveOn', null);
    this.send('refresh');
  },

  remapToModels (assignment) {
    let employees = assignment.get('employees'),
        model = this.get('model');

    assignment.set('employee', employees.get('firstObject'));
    assignment.set('effectiveOn', model.get('effectiveOn'));

    if (employees.get('length') === 1) {
      return assignment;
    }

    let assignmentPojo = assignment.getProperties('file', 'creator', 'company', 'signatureRequired', 'message');

    return [ assignment, ...employees.slice(1).map(employee => {
      return this.store.createRecord('file-assignment', $.extend({ employee }, assignmentPojo));
    }) ];
  },

  actions: {
    delete () {
      this.get('model').destroyRecord()
      .then(() => {
        this.transitionToRoute('account.documents');
      });
    },

    openAssignmentModal (file) {
      this.setProperties({
        respondedAssignment: false,
        assigningDocument:   file
      });

      this.createFileAssignment();

      $('#modal__file-assignment').modal({
        detachable: true,
        context:    '.ember-application',
        onHidden:   () => {
          if (!this.get('respondedAssignment')) {
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
      $('#modal__file-assignment').modal('hide');
    }
  }
});
