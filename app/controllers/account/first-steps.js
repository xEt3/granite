import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
  steps: computed(function () {
    return [{
      key: 'anatomy',
      title: 'Anatomy',
      description: 'Anatomy is where you will find "Departments", "Locations", and "Users".',
      link: 'account.anatomy'
    }, {
      key: 'employees',
      title: 'Employees',
      description: 'Employees is where you can add/remove or make changes to your current empolyees.',
      link: 'account.employees'
    }, {
      key: 'settings',
      title: 'Settings',
      description: 'Settings is where you can find "Billing", "Integrations" and "Templates" to make your life easier.',
      link: 'account.settings'
    }];
  })
});
