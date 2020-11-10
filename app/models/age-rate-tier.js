import Model, { attr } from '@ember-data/model';

export default class AgeRateTierModel extends Model {
  @attr('number') ageStart
  @attr('number') ageEnd
  @attr('number') rate
  @attr('string') rateType
}
