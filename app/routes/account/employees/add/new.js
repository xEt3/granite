import Route from 'granite/core/route';

export default class AccountEmployeesAddNewRoute extends Route {
  titleToken = 'New Employee'
  modelName =  'employee'
  routeType = 'add'

  getModelDefaults () {
    return {
      company:            this.auth.get('user.company'),
      onboarder:          this.auth.get('user'),
      onboarding:         true,
      onboardingStep:     0,
      onboardingProgress: 0,
      addressState:       this.auth.get('user.company.addressState')
    };
  }
}
