import { Model, belongsTo, hasMany } from 'ember-cli-mirage';

export default Model.extend({
  owner:         belongsTo('employee'),
  company:       belongsTo('company'),
  prerequisites: hasMany('action-items')
});
