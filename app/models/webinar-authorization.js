import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

export default Model.extend({
  webinar:   belongsTo('webinar', { inverse: null }),
  purchaser: belongsTo('company-user', { inverse: null }),
  company:   belongsTo('company', { inverse: null }),

  expiration: attr('date'),
  created:    attr('date')
});
