import classic from 'ember-classic-decorator';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

@classic
export default class Renewal extends Model {
  @attr('date') completedOn;

  @belongsTo('file', {
    async:   true,
    inverse: null
  })
  document;
}
