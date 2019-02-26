export const eeocSelectOptions = {
  race: [{
    label: 'White/Caucasian',
    value: 1
  }, {
    label: '⁪Black/African American',
    value: 2
  }, {
    label: '⁪American Indian/Alaskan Native',
    value: 3
  }, {
    label: '⁪Asian',
    value: 4
  }, {
    label: '⁪Native Hawaiian or Other Pacific Islander',
    value: 5
  }, {
    label: 'More than one of the above',
    value: 6
  }],

  gender: [{
    label: 'Male',
    value: 1
  }, {
    label: 'Female',
    value: 2
  }]
};

export const eeocForm = [{
  label:       'Race',
  type:        'select',
  path:        'race',
  contentPath: 'controller.eeocSelectOptions.race',
  valuePath:   'value',
  displayKey:  'label',
  selectText:  'Select one'
}, {
  label:       'Gender',
  type:        'select',
  path:        'gender',
  contentPath: 'controller.eeocSelectOptions.gender',
  valuePath:   'value',
  displayKey:  'label',
  selectText:  'Select one'
}];
