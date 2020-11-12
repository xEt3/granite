import classic from 'ember-classic-decorator';
import { computed } from '@ember/object';
import Model from '@ember-data/model';
import { attr } from '@ember-data/model';
import { belongsTo } from 'ember-data/relationships';
import { hasMany } from '@ember-data/model';

@classic
export default class bankAccountSchema extends Model  {
  @attr('string')number
  @attr('string')routing
  @attr('string')type
  @attr('number', { defaultValue: 100 })achAmount
  @attr('string', { defaultValue: '%' })achType
  @attr('date', {
    defaultValue () {
      return new Date();
    }
  })
  created;
}
