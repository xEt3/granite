import Model, { attr } from '@ember-data/model';

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

export default class PlanModel extends Model {
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

  get icon () {
    return (typeMap[this.type] || {}).icon;
  }

  get label () {
    return (typeMap[this.type] || {}).label;
  }
}