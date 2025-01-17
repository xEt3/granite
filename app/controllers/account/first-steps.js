import Controller from 'granite/core/controller';

export default class AccountFirstStepsController extends Controller {
  steps = [{
    key:         'anatomy',
    title:       'Anatomy',
    icon:        'sitemap',
    description: 'Start in anatomy to create panel users, departments, locations, and review your company\'s organizational chart.',
    link:        'account.anatomy',
    condition:   'Create a department and location'
  }, {
    key:         'employees',
    title:       'Employees',
    icon:        'users',
    description: 'Add employees, view personnel information, approve and review change requests, and perform HR actions here.',
    link:        'account.employees',
    condition:   'Create an employee'
  }, {
    key:         'settings',
    title:       'Settings',
    icon:        'settings',
    description: 'Edit billing information, customize email/action templates, change company branding and company settings.',
    link:        'account.settings',
    condition:   'Visit the settings page'
  }];
}
