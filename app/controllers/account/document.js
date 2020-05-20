import Controller from 'granite/core/controller';
import { computed, action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { Promise } from 'rsvp';
import { inject as service } from '@ember/service';
import $ from 'jquery';

export default class DocumentController extends Controller {
  @service auth
  @service data
  @tracked isExpanded = false
  @tracked fileAssignment
  @tracked resolveAssignment
  @tracked rejectAssignment
  @tracked respondedAssignment

  get fileAssignmentForm () {
    return [{
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
    }];
  }

  @computed.match('model.extension', /je?pg|png|gif/i)
  imagePreview

  @action
  createFileAssignment () {
    if (this.fileAssignment) {
      this.fileAssignment.destroyRecord();
    }

    let assignment = this.store.createRecord('file-assignment', {
      file:    this.model,
      creator: this.auth.user.get('employee')
    });

    this.fileAssignment = assignment;
    return assignment;
  }

  @action
  afterSave () {
    this.fileAssignment = null;
    this.model.set('effectiveOn', null);
    this.send('refreshModel');
    this.transitionToRoute('account.document.index', this.model.id);
  }

  @action
  remapToModels (assignment) {
    let employees = assignment.get('employees'),
        model = this.model;

    assignment.set('employee', employees.get('firstObject'));
    assignment.set('effectiveOn', model.get('effectiveOn'));

    if (employees.get('length') === 1) {
      return assignment;
    }

    let assignmentPojo = assignment.getProperties('file', 'creator', 'company', 'signatureRequired', 'message');

    return [ assignment, ...employees.slice(1).map(employee => this.store.createRecord('file-assignment', {
      employee,
      ...assignmentPojo
    })) ];
  }

  @action
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
        if (!this.respondedAssignment) {
          this.respondAssignment(false);
        }
      }
    }).modal('show');

    return new Promise((resolveAssignment, rejectAssignment) => Object.assign(this, {
      resolveAssignment,
      rejectAssignment
    }));
  }

  @action
  respondAssignment (response) {
    this[response ? 'resolveAssignment' : 'rejectAssignment'](response ? this.fileAssignment : null);
    this.respondedAssignment = true;
    this.closeAssignmentModal();
  }

  @action
  closeAssignmentModal () {
    $('#modal__file-assignment').modal('hide');
  }
}
