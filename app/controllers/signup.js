import Controller from 'granite/core/controller';
import { inject as service } from '@ember/service';

const baseSteps = [{
  title:       'Company Information',
  description: 'Let\'s get to know your company',
  icon:        'info circle',
  path:        'signup.index'
}, {
  title:       'Billing',
  description: 'Begin your subscription',
  icon:        'cubes',
  path:        'signup.billing'
}, {
  title:       'Begin Setup',
  description: 'Get your company set up in Granite',
  icon:        'settings',
  path:        'signup.finish'
}];

export default class SignupController extends Controller {
  @service router

  get steps () {
    const appPath = this.router.currentRouteName;

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
  }
}
