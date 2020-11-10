import Controller from 'granite/core/controller';

const displayDependentsFirst = [ 'Domestic Partner', 'Spouse' ];

export default class AccountBenefitsEnrollmentsEnrollmentIndexController extends Controller {
  get sortedDependents () {
    return this.model.dependents.toArray().sort((a, b) => {
      const relIA = displayDependentsFirst.indexOf(a.relationship) + 1,
            relIB = displayDependentsFirst.indexOf(b.relationship) + 1;

      return relIA === relIB ? a.firstName.toLowerCase().localeCompare(b.firstName.toLowerCase()) : relIB - relIA;
    });
  }
}
