import classic from 'ember-classic-decorator';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

@classic
export default class AssetAssignment extends Model {
  @belongsTo('employee')
  employee;

  @belongsTo('company-user')
  assigner;

  @attr('date', {
    defaultValue () {
      return new Date();
    }
  })
  created;
}
