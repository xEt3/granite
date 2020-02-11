import Model, { attr, belongsTo } from '@ember-data/model';

export default class WebinarAuthorizationModel extends Model {
  @belongsTo('webinar', { inverse: null }) webinar
  @belongsTo('company-user', { inverse: null }) purchaser
  @belongsTo('company', { inverse: null }) company

  @attr('date') expiration
  @attr('date') created
}
