import Route from 'granite/core/route';

export default class AccountBenefitsEnrollmentsEnrollmentRoute extends Route {
  model ({ enrollment_id }) {
    return this.store.find('enrollment', enrollment_id);
  }
}
