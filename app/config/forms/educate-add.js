export const forms = {
  'certification': {
    elements: [{
      label: 'Name',
      type:  'text',
      path:  'name'
    }, {
      label: 'Notes',
      type:  'textarea',
      rows:  '3',
      path:  'note'
    }, {
      label:    'Initial Date',
      helpText: 'Specify original date of certification. Useful especially for renewals.',
      type:     'date',
      path:     'initialDate'
    }, {
      label: 'Renews',
      type:  'checkbox',
      path:  'renews'
    }, {
      displayIf:     'renews',
      label:         'Renews Every',
      type:          'number',
      path:          'renewalPeriodAmount',
      parentClass:   'inside-input__container',
      embeddedInput: {
        showLabel:       false,
        inputClass:      'inline inside-input',
        removeBaseClass: true,
        type:            'select',
        path:            'renewalPeriodUnit',
        contentPath:     'controller.currentForm.selections.renewalUnits'
      }
    }, {
      label: 'Requires document',
      type:  'checkbox',
      path:  'requiresDocument'
    }, {
      displayIf: 'requiresDocument',
      label:     'Upload a document',
      autoTag:   'Certification',
      singleDoc: true,
      helpText:  'Uploading a document bypasses the need for the employee to upload their certification. This is useful if you already have a copy and need no action from the employee. If you would rather the employee upload their own document, leave this blank.',
      type:      'file',
      path:      'document'
    }],
    selections: { renewalUnits: [ 'days', 'months', 'years' ] }
  },

  'training assignment': {
    elements: [{
      label: 'Name',
      type:  'text',
      path:  'name'
    }, {
      label: 'Notes',
      type:  'textarea',
      rows:  '3',
      path:  'note'
    }, {
      label:       'Status',
      type:        'select',
      path:        'status',
      contentPath: 'controller.currentForm.selections.statuses'
    }],
    selections: { statuses: [ 'Assigned', 'Completed' ] }
  }
};
