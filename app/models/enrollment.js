import Model from '@ember-data/model';
import { attr } from '@ember-data/model';
import { belongsTo } from 'ember-data/relationships';
import { hasMany } from '@ember-data/model';

export default class EnrollmentModel extends Model {
  // Progress
  @attr('boolean') pending
  @attr('number') pendingStep
  @attr('number') pendingProgress

  @attr('date') terminationDate

  @attr('date') reviewedEnrollment
  @attr('boolean') waivingAll
  @attr('string') waivingSpouse
  @attr('string') waivingSpouseReason
  @attr('array') waivingDependents
  @attr('string') waivingDependentsReason
  @attr('string') signature
  @attr('string') signatureIP
  @attr('string') qualifyingEvent

  // Dates
  @attr('date', { defaultValue: Date.now }) created
  @attr('date') signedOn

  // Relationships
  @belongsTo('file') qualifyingDoc
  @belongsTo('company', {
    async:   true,
    inverse: null
  }) company
  @belongsTo('employee', {
    async:   true,
    inverse: null
  }) employee

  @belongsTo('enrollment', {
    async:   true,
    inverse: null
  }) supersededBy

  @belongsTo('enrollment', {
    async:   true,
    inverse: null
  }) supersedes

  // Embedded
  @hasMany('dependent') dependents
  @hasMany('election') elections
  // @hasMany('beneficiary') beneficiaries

}
