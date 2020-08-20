import { Model, belongsTo, hasMany } from 'ember-cli-mirage';

export default Model.extend({
  company:    belongsTo('company'),
  jobOpening: belongsTo('jobOpening'),
  targetId:   belongsTo('job-opening'),
  elements:   hasMany('form-element')
});
