import { Model, belongsTo, hasMany} from 'ember-cli-mirage';

export default Model.extend({
  company:  belongsTo('company'),
  targetId: belongsTo('job-opening'),
  elements: hasMany('form-element'),
});
