import { Model, belongsTo } from 'ember-cli-mirage';

export default Model.extend({
  company:       belongsTo('company'),
  creator:       belongsTo('employee'),
  employee:      belongsTo('employee'),
  severity:      belongsTo('corrective-action-severity'),
  employeeIssue: belongsTo('employee-issue')
});
