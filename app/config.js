const states = [
  'Alabama',
  'Alaska',
  'American Samoa',
  'Arizona',
  'Arkansas',
  'California',
  'Colorado',
  'Connecticut',
  'Delaware',
  'District of Columbia',
  'Federated States of Micronesia',
  'Florida',
  'Georgia',
  'Guam',
  'Hawaii',
  'Idaho',
  'Illinois',
  'Indiana',
  'Iowa',
  'Kansas',
  'Kentucky',
  'Louisiana',
  'Maine',
  'Marshall Islands',
  'Maryland',
  'Massachusetts',
  'Michigan',
  'Minnesota',
  'Mississippi',
  'Missouri',
  'Montana',
  'Nebraska',
  'Nevada',
  'New Hampshire',
  'New Jersey',
  'New Mexico',
  'New York',
  'North Carolina',
  'North Dakota',
  'Northern Mariana Islands',
  'Ohio',
  'Oklahoma',
  'Oregon',
  'Palau',
  'Pennsylvania',
  'Puerto Rico',
  'Rhode Island',
  'South Carolina',
  'South Dakota',
  'Tennessee',
  'Texas',
  'Utah',
  'Vermont',
  'Virgin Island',
  'Virginia',
  'Washington',
  'West Virginia',
  'Wisconsin',
  'Wyoming'
];

const notifyDefaults = { autoClear: true };

const carriers = [{
  name:  'Associated Employers Group Benefit Plan & Trust',
  key:   'ae',
  logo:  'https://granitehr-dev.s3.amazonaws.com/uploads/5d6e7d2fd41c6c27661eb678/5f08c43009c42358fdc6fc3e_83SDcMJFX8szueppRoV3.png',
  phone: '1 (406) 248-6224'
}];

const openEnrollments = [{
  start: '12/01',
  end:   '3/01'
}];

export {
  states,
  openEnrollments,
  notifyDefaults,
  carriers
};
