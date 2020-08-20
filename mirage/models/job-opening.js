import { Model, belongsTo } from 'ember-cli-mirage';

export default Model.extend({
  company:  belongsTo('company'),
  job:      belongsTo('job'),
  creator:  belongsTo('employee'),
  location: belongsTo('location')
});
