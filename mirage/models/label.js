import { Model, belongsTo } from 'ember-cli-mirage';

export default Model.extend({ company: belongsTo('company') });
