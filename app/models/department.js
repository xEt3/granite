import classic from 'ember-classic-decorator';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';


@classic
export default class Department extends Model {
  @attr('string') name;

  @attr('string') code;

  @belongsTo('company') company;

  @belongsTo('company-user', {
    async:   true,
    inverse: null
  })
  creator;

  @attr('date', {
    defaultValue () {
      return new Date();
    }
  })
  created;
}
