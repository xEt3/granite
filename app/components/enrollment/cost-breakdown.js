import Component from '@glimmer/component';

export default class EnrollmentCostBreakdownComponent extends Component {
  get groups () {
    return [{
      key:   'M',
      title: 'Health'
    }, {
      key:   'D',
      title: 'Dental'
    }, {
      key:           'V',
      title:         'Vision',
      hideWhenEmpty: true
    }, {
      key:   'L',
      title: 'Life'
    }, {
      key:           'O',
      title:         'Other',
      hideWhenEmpty: true
    }].map(cat => {
      return {
        ...cat,
        elections: this.args.elections.filter(elect => elect.get('plan.type') === cat.key)
      };
    });
  }

  get useWellnessRate () {
    return this.args.company.get('wellnessPlan') && this.args.employee.get('wellnessPlan');
  }

  get totals () {
    const wellness = this.useWellnessRate;

    const totals = this.args.elections.reduce((tots, election) => {
      const plan = election.get('plan');

      if (plan.get('type') === 'L' && !plan.get('ratesFixed')) {
        tots.gross += election.amounts.reduce((tot, amtGroup) => {
          const dependentForCoverage = amtGroup.dependent ? election.dependents.findBy('id', amtGroup.dependent) : this.args.employee,
                relationship = (dependentForCoverage || {}).relationship,
                dependentType = [ 'Domestic Partner', 'Spouse' ].includes(relationship) ?
                  'Spouse' :
                  relationship ?
                    'Dependent' :
                    'Employee',
                ageTier = plan.get('tierForAge')(dependentType, dependentForCoverage.get('age')) || {};

          return tot + (amtGroup.amount || 0) / plan.get('lifeCoverage') * (ageTier.rate || 0);
        }, 0);
      } else {
        tots.gross += election.grossCost || 0;
        tots.deductions += (wellness ? election.employerContributions.wellness : election.employerContributions.nonWellness) || 0;
      }

      return tots;
    }, {
      gross:      0,
      deductions: 0
    });

    return {
      ...totals,
      net: totals.gross - totals.deductions || 0
    };
  }
}
