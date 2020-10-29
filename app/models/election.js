import Model, { attr } from '@ember-data/model';
import { belongsTo, hasMany } from 'ember-data/relationships';

const coverageLevelMap = [
  'Employee',
  'Employee & Spouse',
  'Employee & Children',
  'Family'
];

const coverageLevelRateMap = [
  'Employee',
  'Spouse',
  'Dependent',
  'Family'
];

export default class ElectionModel extends Model {
  @attr('number') coverageLevel
  @belongsTo('plan') plan
  @attr('array') amounts
  @attr('string') planType
  @hasMany('dependent') dependents

  get coverageLevelHumanized () {
    return coverageLevelMap[this.coverageLevel];
  }

  get rateKey () {
    return this.get('plan.ratesFixed') && this.get('plan.type') === 'L' ? 'Fixed' : coverageLevelRateMap[this.coverageLevel];
  }

  get grossCost () {
    return this.get(`plan.rates${this.rateKey}`);
  }

  get employerContributions () {
    const contrib = this.get(`plan.contributions${this.rateKey}Amount`),
          wellnessMod = this.get(`plan.contributions${this.rateKey}WellnessModifier`);

    return {
      wellness:    contrib + (wellnessMod || 0),
      nonWellness: contrib
    };
  }
}
