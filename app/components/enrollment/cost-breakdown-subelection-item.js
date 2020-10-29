import Component from '@glimmer/component';

export default class EnrollmentCostBreakdownSubelectionItemComponent extends Component {
  get cost () {
    const { subElection, plan } = this.args,
          dependentForCoverage = this.dependentForCoverage,
          relationship = (dependentForCoverage || {}).relationship,
          dependentType = [ 'Domestic Partner', 'Spouse' ].includes(relationship) ?
            'Spouse' :
            relationship ?
              'Dependent' :
              'Employee',
          ageTier = plan.get('tierForAge')(dependentType, dependentForCoverage.get('age')) || {};

    return (subElection.amount || 0) / plan.get('lifeCoverage') * (ageTier.rate || 0);
  }

  get dependentForCoverage () {
    return this.args.subElection.dependent ? this.args.election.dependents.findBy('id', this.args.subElection.dependent) : this.args.employee;
  }
}
