import Component from '@glimmer/component';

const relSort = [ 'Employee', 'Spouse', 'Domestic Partner' ];

export default class EnrollmentCostBreakdownElectionItemComponent extends Component {
  get sortedAmounts () {
    return (this.args.election.amounts || []).sort((a, b) => {
      const adep = this.args.election.dependents.findBy('id', a.dependent),
            bdep = this.args.election.dependents.findBy('id', b.dependent),
            ai = relSort.indexOf(adep ? adep.relationship : 'Employee'),
            bi = relSort.indexOf(bdep ? bdep.relationship : 'Employee');

      return (ai > -1 ? ai : 3) - (bi > -1 ? bi : 3);
    });
  }
}
