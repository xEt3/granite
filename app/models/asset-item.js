import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';
import { computed } from '@ember/object';

export default Model.extend({
  identifier:   attr('string'),
  assignments:  hasMany('asset-assignment'),
  customFields: attr(),

  asset:     belongsTo('asset'),
  creator:   belongsTo('company-user'),
  company:   belongsTo('company'),
  documents: hasMany('file', {
    inverse: null,
    async:   true
  }),

  created: attr('date', { defaultValue: () => new Date() }),

  assetId: computed.reads('asset.id')
});
