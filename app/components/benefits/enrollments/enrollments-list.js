import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

export default class EnrollmentListComponent extends Component {
  @service auth
  @service data

  stepNames = [
    'Information',
    'Dependents',
    'Elect',
    'Beneficiaries',
    'Review',
    'Complete'
  ]

  planNames= {
    M: 'Medical',
    D: 'Dental',
    V: 'Vision',
    L: 'Life',
    O: 'Other'
  }

  get step () {
    return this.stepNames[ this.args.model.pendingStep ];
  }

  get elections () {
    let elects =  this.args.model.elections.reduce((build, election) => {
      let type = this.planNames[election.planType];
      let name = election.get('plan.name');
      let { coverageLevelHumanized } = election;

      if (!build[type]) {
        build[type] = {
          type,
          name,
          count: 1,
          coverageLevelHumanized
        };
        return build;
      }

      build[type].count = build[type].count += 1;

      return build;
    }, {});
    return elects;
  }

  get waivedBenefits () {
    let { waivingAll, waivingDependents, waivingSpouse  } = this.args.model;
    let all = waivingAll ? 'All' : !!waivingAll,
        dependents = waivingDependents.length  ? 'Dependents' : !waivingDependents,
        spouse = waivingSpouse ? 'Spouse' : !!waivingSpouse;

    return {
      waived:         all || dependents || spouse,
      benefitsWaived: all ? 'Dependents and Spouse' : dependents || spouse
    };
  }
}
