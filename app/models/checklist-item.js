import DS from 'ember-data';
import Model from 'ember-data/model';
const { attr, belongsTo } = DS;

export default Model.extend({
  name:        attr('string'),
  completedOn: attr('date'),
  assignedOn:  attr('date'),
  priority:    attr('number'),
  assignedTo:  belongsTo('company-user', { async: true }),
  assignedBy:  belongsTo('company-user', { async: true }),
  completedBy: belongsTo('company-user', { async: true })
});
