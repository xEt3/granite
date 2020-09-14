import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';
import { computed } from '@ember/object';

export default class OpenEnrollment extends Model {
  @belongsTo('company') company

  @attr('date') start

  @attr('date') end

  @attr('date', { defaultValue: () => new Date() }) created;

  @computed('start')
  get startMonth () {
    return Number(moment(this.start).format('M'));
  }

  @computed('start')
  get startDay () {
    return Number(moment(this.start).format('D'));
  }

  @computed('end')
  get endMonth () {
    return Number(moment(this.end).format('M'));
  }

  @computed('end')
  get endDay () {
    return Number(moment(this.end).format('D'));
  }
}
