import Model, { attr } from '@ember-data/model';
import { hasMany } from '@ember-data/model';

const typeMap = {
  M: {
    icon:  'stethoscope',
    label: 'Health'
  },
  D: {
    icon:  'clipboard outline',
    label: 'Dental'
  },
  V: {
    icon:  'eye',
    label: 'Vision'
  },
  L: {
    icon:  'life ring outline',
    label: 'Life'
  },
  O: {
    icon:  'plus square',
    label: 'Other'
  }
};

const AZ = 'abcdefghijklmnopqrstuvwxyz'.split('');

function generateHSLStr (h, s, l) {
  return `hsl(${h}deg, ${s}%, ${l}%)`;
}

export default class PlanModel extends Model {
  constructor () {
    super(...arguments);
    this.tierForAge = this.tierForAge.bind(this);
  }

  @attr('string') number
  @attr('string') type
  @attr('string') description
  @attr('string') carrierPlanId
  @attr('string') carrier
  @attr('string') name
  @attr('number') companyNumber
  @attr('date') effectiveDate
  @attr('string') waitingPeriod
  @attr('number') minimumHours
  @attr('string') soleProprietor
  @attr('string') retires
  @attr('string') addOnBenefits
  @attr('date') termDate
  @attr('number') lifeCoverage
  @attr('date') lifeEffective
  @attr('number') maximumCoverage
  @attr('string') contactName
  @attr('string') contactPhone
  @attr('string') contactFax
  @attr('string') contactAddressLine1
  @attr('string') contactAddressCity
  @attr('string') contactAddressState
  @attr('string') contactAddressZip
  @attr('string') networkName
  @attr('string') networkDescription
  @attr('number') ratesEmployee
  @attr('number') ratesSpouse
  @attr('number') ratesDependent
  @attr('number') ratesFamily
  @attr('number') ratesFixed
  @attr('string') fromService
  @attr('array') additionalDocuments
  @attr('boolean') voluntary
  @attr('string') coinsurance
  @attr('number') medicalDeductible
  @attr('number') dentalDeductible
  @attr('number') deductibleFamily
  @attr('number') maxOutOfPocket
  @attr('number') maxOutOfPocketFamily
  @attr('string') sbcLink
  @attr('string') spdLink

  @hasMany('age-rate-tier') ratesAgeTiersEmployee
  @hasMany('age-rate-tier') ratesAgeTiersSpouse
  @hasMany('age-rate-tier') ratesAgeTiersDependent

  @attr('number', { defaultValue: 0 }) contributionsEmployeeAmount
  @attr('number', { defaultValue: 0 }) contributionsEmployeeWellnessModifier
  @attr('string', { defaultValue: 'dollar' }) contributionsEmployeeType

  @attr('number', { defaultValue: 0 }) contributionsSpouseAmount
  @attr('number', { defaultValue: 0 }) contributionsSpouseWellnessModifier
  @attr('string', { defaultValue: 'dollar' }) contributionsSpouseType

  @attr('number', { defaultValue: 0 }) contributionsChildrenAmount
  @attr('number', { defaultValue: 0 }) contributionsChildrenWellnessModifier
  @attr('string', { defaultValue: 'dollar' }) contributionsChildrenType

  @attr('number', { defaultValue: 0 }) contributionsFamilyAmount
  @attr('number', { defaultValue: 0 }) contributionsFamilyWellnessModifier
  @attr('string', { defaultValue: 'dollar' }) contributionsFamilyType
  @attr('boolean') wellnessPlan

  get rates () {
    return {
      employee:   this.contributionsEmployeeAmount + (this.wellnessPlan ? this.contributionsEmployeeWellnessModifier : 0),
      spouse:     this.contributionsSpouseAmount + (this.wellnessPlan ? this.contributionsSpouseWellnessModifier : 0),
      family:     this.contributionsFamilyAmount + (this.wellnessPlan ? this.contributionsFamilyWellnessModifier : 0),
      dependents: this.contributionsChildrenAmount + (this.wellnessPlan ? this.contributionsChildrenWellnessModifier : 0)
    };
  }

  get icon () {
    return (typeMap[this.type] || {}).icon;
  }

  get label () {
    return (typeMap[this.type] || {}).label;
  }

  get priceRange () {
    const prices = [
      this.ratesEmployee,
      this.ratesSpouse,
      this.ratesDependent,
      this.ratesFamily,
      this.ratesFixed
    ].filter(Boolean);

    let ratesAgeTiers = [ 'Employee', 'Spouse', 'Dependent' ];

    let ageTiers = {};

    ratesAgeTiers.map(tier => {
      if ((this[`ratesAgeTiers${tier}`] || []).length) {
        const tieredRates = this[`ratesAgeTiers${tier}`].mapBy('rate');
        ageTiers[tier.toLowerCase()] = {
          min: Math.min(...tieredRates),
          max: Math.max(...tieredRates)
        };
        return ageTiers;
      }
    });

    if (ageTiers) {
      return ageTiers;
    }

    return {
      min: Math.min(...prices),
      max: Math.max(...prices)
    };
  }


  get numRepresentation () {
    return btoa(`${this.type} ${this.name} ${this.networkName}`).substr(0, 100).split('').reduce((tot, b) => {
      return tot + (!isNaN(parseInt(b, 0)) ? parseInt(b, 0) : AZ.indexOf(b.toLowerCase())) || 1;
    }, 0);
  }

  get colorway () {
    const hue = this.numRepresentation % 227, // this dodges purple, it looks gross :P
          saturation = Math.max(Math.min(this.numRepresentation % 90, 60), 30),
          lightness = Math.max(this.numRepresentation % 75, 60);

    return {
      hue,
      saturation,
      lightness,
      whiteText: lightness / 100 <= 0.2,
      string:    generateHSLStr(hue, saturation, lightness)
    };
  }

  get colorwayShades () {
    const {
      hue,
      saturation,
      lightness
    } = this.colorway;

    const waveMult = 15;

    return [{
      hue:        hue + waveMult,
      saturation: saturation + waveMult,
      lightness:  lightness + waveMult
    }, {
      hue:        hue - waveMult,
      saturation: saturation - waveMult,
      lightness:  lightness - waveMult
    }].map(o => ({
      ...o,
      string: generateHSLStr(o.hue, o.saturation, o.lightness)
    }));
  }

  get colorwayGradient () {
    const { colorway, colorwayShades } = this;

    return `linear-gradient(${colorwayShades[0].string}, transparent),
    linear-gradient(90deg, ${colorway.string}, transparent),
    linear-gradient(-90deg, ${colorwayShades[1].string}, transparent)`;
  }

  get exclusiveCategory () {
    return [ 'M', 'D' ].includes(this.type);
  }

  tierForAge (type, age) {
    if (![ 'Employee', 'Spouse', 'Dependent' ].includes(type)) {
      throw new Error(`Invalid tier type: ${type}`);
    }

    const tiersToSearch = this[`ratesAgeTiers${type}`];
    return tiersToSearch.find(tier => age > tier.ageStart && age <= tier.ageEnd);
  }
}
