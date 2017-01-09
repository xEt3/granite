export default [{
  when: 'employee',
  prepend: {
    segment: 'employees',
    link: 'account.employees'
  }
}, {
  when: 'asset',
  prepend: {
    segment: 'assets',
    link: 'account.assets'
  }
}, {
  when: 'action-item',
  prepend: {
    segment: 'action items',
    link: 'account.action-items'
  }
}, {
  when: 'job-description',
  prepend: {
    segment: 'recruiting',
    link: 'account.recruiting'
  }
}, {
  when: 'job-opening',
  prepend: {
    segment: 'recruiting',
    link: 'account.recruiting'
  }
}, {
  when: 'job-description',
  prepend: {
    segment: 'job descriptions',
    link: 'account.recruiting.job-descriptions'
  }
}, {
  when: 'eeo',
  overrideName: 'Equal Employment Opportunity'
}];
