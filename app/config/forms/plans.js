export const planOptions = {
  type: [{
    label: 'Life',
    value: 'L'
  }, {
    label: 'Health',
    value: 'M'
  }, {
    label: 'Dental',
    value: 'D'
  }, {
    label: 'Vision',
    value: 'V'
  }, {
    label: 'Other',
    value: 'O'
  }],

  waitingPeriod: [{
    label: 'First of Month',
    value: 'First of Month'
  }, {
    label: '30 days',
    value: '30 days'
  }, {
    label: '60 days',
    value: '60 days'
  }, {
    label: '90 days',
    value: '90 days'
  }]
};

export const planForm = [{
  path:  'number',
  label: 'Number',
  type:  'text'
}, {
  path:        'type',
  label:       'Type of Plan',
  type:        'select',
  contentPath: 'controller.planOptions.type',
  displayKey:  'label',
  valuePath:   'value',
  selectText:  'Select a Type'
}, {
  path:  'description',
  label: 'Description',
  type:  'textarea',
  rows:  '3'
}, {
  path:  'carrierPlanId',
  label: 'Carrier PlanId',
  type:  'text'
}, {
  path:  'name',
  label: 'Name',
  type:  'text'
}, {
  path:  'effectiveDate',
  label: 'Effective Date',
  type:  'date'
}, {
  path:        'waitingPeriod',
  label:       'Waiting Period',
  type:        'select',
  displayKey:  'label',
  selectText:  'Select a Waiting Period',
  contentPath: 'controller.planOptions.waitingPeriod',
  valuePath:   'value'
}, {
  path:  'minimumHours',
  label: 'Minimum Hours',
  type:  'number'
}, {
  displayIf:   'type',
  displayIfEq: 'L',
  path:        'lifeCoverage',
  label:       'Life Coverage',
  type:        'text'
}, {
  displayIf:   'type',
  displayIfEq: 'L',
  path:        'lifeEffective',
  label:       'Life Effective',
  type:        'text'
}, {
  displayIf:   'type',
  displayIfEq: 'L',
  path:        'maximumCoverage',
  label:       'Maximum Coverage',
  type:        'text'
}, {
  path:  'voluntary',
  label: 'Voluntary',
  type:  'checkbox'
}, {
  path:  'networkName',
  label: 'Network Name',
  type:  'text'
}, {
  path:  'networkDescription',
  label: 'Network Description',
  type:  'textarea',
  rows:  '3'
}, {
  label: 'Fixed Rates',
  type:  'checkbox',
  path:  'fixedRate'
}, {
  displayIf: 'fixedRate',
  path:      'ratesFixed',
  label:     'Fixed rates',
  type:      'number'
}, {
  displayIfNot: 'fixedRate',
  path:         'ratesEmployee',
  label:        'Employee rates',
  type:         'number'
}, {
  displayIfNot: 'fixedRate',
  path:         'ratesSpouse',
  label:        'Spouse rates',
  type:         'number'
}, {
  displayIfNot: 'fixedRate',
  path:         'ratesDependent',
  label:        'Dependent rates',
  type:         'number'
}, {
  displayIfNot: 'fixedRate',
  path:         'ratesFamily',
  label:        'Family Rates',
  type:         'number'
}];

