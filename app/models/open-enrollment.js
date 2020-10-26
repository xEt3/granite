import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

export default class OpenEnrollment extends Model {
  @belongsTo('company') company

  @attr('date') start

  @attr('date') end

  @attr('date', { defaultValue: () => new Date() }) created;

  get startMonth () {
    return Number(moment(this.start).month());
  }

  get startDay () {
    return Number(moment(this.start).date());
  }

  get endMonth () {
    return Number(moment(this.end).month());
  }

  get endDay () {
    return Number(moment(this.end).date());
  }
}
