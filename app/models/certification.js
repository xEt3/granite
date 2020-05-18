import classic from 'ember-classic-decorator';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';

@classic
export default class Certification extends Model {
  @attr('string') name;

  @attr('string') note;

  @attr('number', { defaultValue: 1 }) renewalPeriodAmount; // 1

  @attr('string', { defaultValue: 'years' }) renewalPeriodUnit; // year

  @attr('date') nextRenewalDate;

  @attr('boolean') renews;

  @hasMany('renewal') renewals;

  @attr('boolean') requiresDocument;

  @attr('date') initialDate;

  @belongsTo('file') document;

  @belongsTo('company') company;

  @belongsTo('employee') creator;

  @belongsTo('employee') employee;

  @attr('date') documentUploadedOn;

  @attr('date', {
    defaultValue () {
      return new Date();
    }
  })
  created;
}
