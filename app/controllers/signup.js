import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { inject as controller } from '@ember/controller';

const baseSteps = [{
  title:       'Company Information',
  description: 'Let\'s get to know your company',
  icon:        'info circle',
  path:        'signup.index'
}, {
  title:       'Billing',
  description: 'Begin your 14-day trial',
  icon:        'cubes',
  path:        'signup.billing'
}, {
  title:       'Begin Setup',
  description: 'Get your company set up in Granite',
  icon:        'settings',
  path:        'signup.finish'
}];

export default Controller.extend({
  application: controller(),

  steps: computed('application.currentPath', function () {
    const appPath = this.get('application.currentPath');

    let activeToggled;

    return [ ...baseSteps ].map(step => {
      let active = step.path === appPath;

      let retObj = Object.assign({}, step, {
        active,
        completed: !activeToggled && !active
      });

      if (active) {
        activeToggled = true;
      }

      return retObj;
    });
  })
});
