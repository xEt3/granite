import Model, { attr, belongsTo } from '@ember-data/model';

export default class TrainingAssignmentModel extends Model {
  @attr('string') name
  @attr('string') note
  @attr('string', { defaultValue: 'Assigned' }) status

  @belongsTo('company') company
  @belongsTo('employee') creator
  @belongsTo('employee') employee
  @belongsTo('webinar-authorization') webinar

  @attr('date', {
    defaultValue () {
      return new Date();
    }
  }) created
}
