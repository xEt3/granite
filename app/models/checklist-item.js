import DS from 'ember-data';
import Model from 'ember-data/model';
const { attr, belongsTo } = DS;

export default Model.extend({
  title:       attr('string'),
  completedOn: attr('date'),
  assignedOn:  attr('date'),
  priority:    attr('number'),
  assignedTo:  belongsTo('employee', { async: true }),
  assignedBy:  belongsTo('employee', { async: true }),
  completedBy: belongsTo('employee', { async: true })
});
