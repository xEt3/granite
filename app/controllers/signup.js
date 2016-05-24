import Ember from 'ember';

const { computed, set, get } = Ember;

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

export default Ember.Controller.extend({
  application: Ember.inject.controller(),

  completedSteps: Ember.A(),

  steps: computed('application.currentPath', function () {
    const appPath = this.get('application.currentPath'),
          completedSteps = this.get('completedSteps');

    return steps.map(step => {
      set(step, 'active', get(step, 'path') === appPath);
      set(step, 'completed', completedSteps.contains(get(step, 'path')));
      return step;
    });
  })
});
