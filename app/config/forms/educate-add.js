export const forms = {
  'certification': [{
    label: 'Name',
    type:  'text',
    path:  'name'
  }, {
    label: 'Notes',
    type:  'textarea',
    rows:  '6',
    path:  'note'
  }, {
    label: 'Renews',
    type:  'checkbox',
    path:  'renews'
  }, {
    displayIf:     'renews',
    label:         'Name',
    type:          'number',
    path:          'renewalPeriodAmount',
    embeddedInput: {
      showLabel:  false,
      inputClass: 'inline',
      inputAttrs: { allowAdditions: true },
      type:       'select',
      // selectText:  'Type and hit enter to add email addresses',
      path:       'renewalPeriodUnit'
      // parentClass: 'eight wide column'
    }
  }],

  'training assignment': [{}]
};
