import { Model, belongsTo } from 'ember-cli-mirage';

export default Model.extend({ form: belongsTo('form') });
