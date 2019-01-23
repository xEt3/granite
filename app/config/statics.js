const suffixes = [ 'Sr.', 'Jr.', 'I', 'II', 'III', 'IIII' ];

const states = [
  {
    value: 'AL',
    label: 'Alabama'
  },
  {
    value: 'AK',
    label: 'Alaska'
  },
  {
    value: 'AZ',
    label: 'Arizona'
  },
  {
    value: 'AR',
    label: 'Arkansas'
  },
  {
    value: 'CA',
    label: 'California'
  },
  {
    value: 'CO',
    label: 'Colorado'
  },
  {
    value: 'CT',
    label: 'Connecticut'
  },
  {
    value: 'DE',
    label: 'Delaware'
  },
  {
    value: 'DC',
    label: 'District of Columbia'
  },
  {
    value: 'FL',
    label: 'Florida'
  },
  {
    value: 'GA',
    label: 'Georgia'
  },
  {
    value: 'HI',
    label: 'Hawaii'
  },
  {
    value: 'ID',
    label: 'Idaho'
  },
  {
    value: 'IL',
    label: 'Illinois'
  },
  {
    value: 'IN',
    label: 'Indiana'
  },
  {
    value: 'IA',
    label: 'Iowa'
  },
  {
    value: 'KS',
    label: 'Kansas'
  },
  {
    value: 'KY',
    label: 'Kentucky'
  },
  {
    value: 'LA',
    label: 'Louisiana'
  },
  {
    value: 'ME',
    label: 'Maine'
  },
  {
    value: 'MD',
    label: 'Maryland'
  },
  {
    value: 'MA',
    label: 'Massachusetts'
  },
  {
    value: 'MI',
    label: 'Michigan'
  },
  {
    value: 'MN',
    label: 'Minnesota'
  },
  {
    value: 'MS',
    label: 'Mississippi'
  },
  {
    value: 'MO',
    label: 'Missouri'
  },
  {
    value: 'MT',
    label: 'Montana'
  },
  {
    value: 'NE',
    label: 'Nebraska'
  },
  {
    value: 'NV',
    label: 'Nevada'
  },
  {
    value: 'NH',
    label: 'New Hampshire'
  },
  {
    value: 'NJ',
    label: 'New Jersey'
  },
  {
    value: 'NM',
    label: 'New Mexico'
  },
  {
    value: 'NY',
    label: 'New York'
  },
  {
    value: 'NC',
    label: 'North Carolina'
  },
  {
    value: 'ND',
    label: 'North Dakota'
  },
  {
    value: 'OH',
    label: 'Ohio'
  },
  {
    value: 'OK',
    label: 'Oklahoma'
  },
  {
    value: 'OR',
    label: 'Oregon'
  },
  {
    value: 'PA',
    label: 'Pennsylvania'
  },
  {
    value: 'RI',
    label: 'Rhode Island'
  },
  {
    value: 'SC',
    label: 'South Carolina'
  },
  {
    value: 'SD',
    label: 'South Dakota'
  },
  {
    value: 'TN',
    label: 'Tennessee'
  },
  {
    value: 'TX',
    label: 'Texas'
  },
  {
    value: 'UT',
    label: 'Utah'
  },
  {
    value: 'VT',
    label: 'Vermont'
  },
  {
    value: 'VA',
    label: 'Virginia'
  },
  {
    value: 'WA',
    label: 'Washington'
  },
  {
    value: 'WV',
    label: 'West Virginia'
  },
  {
    value: 'WI',
    label: 'Wisconsin'
  },
  {
    value: 'WY',
    label: 'Wyoming'
  }
];

const jobCategories = [
  'Accounting/Finance',
  'Healthcare',
  'Non-Profit/Volunteering',
  'Administrative',
  'Computer/Internet',
  'Pharmaceutical/Bio-tech',
  'Arts/Entertainment/Publishing',
  'Hospitality/Travel',
  'Real Estate',
  'Banking/Loans',
  'Human Resources',
  'Restaurant/Food Service',
  'Construction/Facilities',
  'Insurance',
  'Retail',
  'Customer Service',
  'Law Enforcement/Security',
  'Sales',
  'Education/Training',
  'Legal',
  'Telecommunications',
  'Engineering/Architecture',
  'Manufacturing/Mechanical',
  'Transportation/Logistics',
  'Government/Military',
  'Marketing/Advertising/PR',
  'Upper Management/Consulting'
];

const jobTypes = [
  'Full Time',
  'Part Time',
  'Contract',
  'Internship',
  'Temporary',
  'Seasonal',
  'Commission'
];

const formTypes = [{
  display: 'Freeform Input',
  icon:    'text cursor',
  use:     'textarea'
}, {
  display: 'Dropdown Selection',
  icon:    'caret down',
  use:     'select'
}, {
  display: 'Radio Selection',
  icon:    'radio',
  use:     'radio'
}, {
  display: 'Checkbox',
  icon:    'check square',
  use:     'checkbox'
}, {
  display: 'Date',
  icon:    'calendar',
  use:     'date'
}, {
  display: 'Toggle',
  icon:    'toggle off',
  use:     'toggle'
}];

const issueTypes = [ 'Performance', 'Behavior', 'Performance & Behavior' ];

const closeMessageMap = {
  prefix:             'Based on your settings',
  default:            'Are you sure you want to close this job opening?',
  sendCloseNotice:    'an email will be sent to those who were not hired',
  allocateTalentPool: 'non-disqualified candidates will be added to your talent pool'
};

const modelPageMap = {
  departments: {
    path: 'account.anatomy.departments',
    all:  true
  },
  locations: {
    path: 'account.anatomy.locations',
    all:  true
  },
  employees: {
    path: 'account.employee',
    all:  false
  }
};

const recordDisplayPropertyMap = {
  departments: [ 'name' ],
  locations:   [ 'name' ],
  employees:   [ 'name.first', 'name.last' ]
};

export {
  issueTypes,
  suffixes,
  states,
  jobCategories,
  jobTypes,
  formTypes,
  closeMessageMap,
  modelPageMap,
  recordDisplayPropertyMap
};
