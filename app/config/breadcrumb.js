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
}];
