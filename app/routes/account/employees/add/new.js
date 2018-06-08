import Route from '@ember/routing/route';
import add from 'granite/mixins/route-abstractions/add';

export default Route.extend(add, {
  modelName: 'employee',

  getModelDefaults () {
    return {
      company: this.get('auth.user.company'),
      onboarder: this.get('auth.user'),
      onboarding: true,
      onboardingStep: 0,
      onboardingProgress: 0
    };
  }
});
