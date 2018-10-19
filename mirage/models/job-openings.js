import { Model, belongsTo, hasMany } from 'ember-cli-mirage';

export default Model.extend({
  company:     belongsTo('company'),
  job:         belongsTo('job'),
  creator:     belongsTo('employee'),
  location:    belongsTo('location'),
  subscribers: hasMany('employee'),
  screening:   belongsTo('form')
});
