export default [{
  when:    'employee',
  prepend: {
    segment: 'employees',
    link:    'account.employees'
  }
}, {
  when:    'document',
  prepend: {
    segment: 'documents',
    link:    'account.documents'
  }
}, {
  when:    'asset',
  prepend: {
    segment: 'assets',
    link:    'account.assets'
  }
}, {
  when:    'job-description',
  prepend: {
    segment: 'recruiting',
    link:    'account.recruiting'
  }
}, {
  when:    'job-opening',
  prepend: {
    segment: 'recruiting',
    link:    'account.recruiting'
  }
}, {
  when:    'job-description',
  prepend: {
    segment: 'job descriptions',
    link:    'account.recruiting.job-descriptions'
  }
}, {
  when:         'eeo',
  overrideName: 'Equal Employment Opportunity'
}, {
  when:         'action-items',
  overrideName: 'Projects'
}, {
  when:         'action-item',
  overrideName: 'Project',
  prepend:      {
    segment: 'projects',
    link:    'account.action-items'
  }
}];
