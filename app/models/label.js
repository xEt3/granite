import classic from 'ember-classic-decorator';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';

@classic
export default class Label extends Model {
  @attr('string')
  color;

  @attr('string')
  text;

  @attr('date', { defaultValue: () => new Date() })
  created;
}
