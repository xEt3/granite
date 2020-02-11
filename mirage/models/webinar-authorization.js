import { Model, belongsTo } from 'ember-cli-mirage';

export default Model.extend({
  webinar: belongsTo('webinar')
  // purchaser: belongsTo('company-user'),
  // company:   belongsTo('company')
});
