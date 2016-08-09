import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';

export default Model.extend({
  identifier:   attr('string'),
  assignments:  hasMany('asset-assignment'),
  customFields: attr(),

  asset:        belongsTo('asset'),
  creator:      belongsTo('company-user'),
  company:      belongsTo('company'),

  created: attr('date', {
    defaultValue () {
      return new Date();
    }
  })
});
