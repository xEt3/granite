import { Model, hasMany } from 'ember-cli-mirage';

export default Model.extend({
  correctiveActionSeverities: hasMany('corrective-action-severity')
});
