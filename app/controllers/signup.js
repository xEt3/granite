import Controller from '@ember/controller';
import { computed, get, set } from '@ember/object';
import { inject as controller } from '@ember/controller';
import { A } from '@ember/array';

const steps = [{
  title: 'Company Information',
  description: 'Let\'s get to know your company',
  icon: 'info circle',
  path: 'signup.index'
}, {
  title: 'Billing',
  description: 'Begin your 14-day trial',
  icon: 'cubes',
  path: 'signup.billing'
}, {
  title: 'Begin Setup',
  description: 'Get your company set up in Granite',
  icon: 'settings',
  path: 'signup.finish'
}];

export default Controller.extend({
  application: controller(),

  completedSteps: A(),

  steps: computed('application.currentPath', function () {
    const appPath = this.get('application.currentPath'),
          completedSteps = this.get('completedSteps');

    return steps.map(step => {
      set(step, 'active', get(step, 'path') === appPath);
      set(step, 'completed', completedSteps.includes(get(step, 'path')));
      return step;
    });
  })
});
