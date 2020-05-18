import classic from 'ember-classic-decorator';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';

@classic
export default class RecruitingPipeline extends Model {
  @attr('array') stages;

  @hasMany('job-opening', { inverse: null }) jobOpenings;

  @belongsTo('company', { inverse: null }) company;

  @attr('date', { defaultValue: () => new Date() }) created;
}
