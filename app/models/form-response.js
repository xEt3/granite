import classic from 'ember-classic-decorator';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

@classic
export default class FormResponse extends Model {
  @attr('array') responses;

  @belongsTo('employee') employee;

  @belongsTo('company') company;

  @belongsTo('employee') creator;

  @belongsTo('form') form;

  @attr('date') submittedOn;

  @attr('string') notificationEmail;

  @attr('date') created;
}
