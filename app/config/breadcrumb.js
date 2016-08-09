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
}];
