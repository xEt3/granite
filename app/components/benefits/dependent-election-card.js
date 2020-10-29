import Component from '@glimmer/component';

export default class BenefitsDependentElectionCardComponent extends Component {
  get categories () {
    const id = this.args.model.get('id'),
          isEmployee = this.args.model.constructor.modelName !== 'dependent';

    return [{
      key:   'M',
      title: 'Health'
    }, {
      key:   'D',
      title: 'Dental'
    }, {
      key:   'V',
      title: 'Vision'
    }, {
      key:   'L',
      title: 'Life'
    }, {
      key:   'O',
      title: 'Other'
    }].map(cat => {
      const electionsForType = this.args.enrollment.electionsByTypeComputed[cat.key] || [];

      return {
        ...cat,
        elections: electionsForType.filter(elec => isEmployee || elec.dependents.find(dep => dep.id === id)).map(elec => {
          return {
            ...elec,
            amount: (elec.amounts || []).find(amtGroup => isEmployee ? !amtGroup.dependent : amtGroup.dependent === id)
          };
        })
      };
    });
  }

  get electedCategories () {
    return this.categories.filter(cat => cat.elections.length);
  }

  get waivedCategories () {
    return this.categories.filter(cat => !cat.elections.length);
  }
}
