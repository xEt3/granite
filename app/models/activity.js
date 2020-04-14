import classic from 'ember-classic-decorator';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';
import resolveForTypeKey from '../utils/resolve-for-type-key';

@classic
export default class Activity extends Model {
  @attr('string')
  description;

  @attr('string')
  descriptionHtml;

  @attr('string')
  context;

  @attr('string')
  action;

  @attr('string')
  icon;

  @attr('string')
  tag;

  @attr('string-or-null')
  actorId;

  @attr('string-or-null')
  actorType;

  @attr('string-or-null')
  targetId;

  @attr('string-or-null')
  targetType;

  @belongsTo('company')
  company;

  @hasMany('comment', { inverse: false })
  comments;

  @hasMany('like', { inverse: false })
  likes;

  @attr('date', { defaultValue: () => new Date() })
  created;

  @resolveForTypeKey('actor')
  actor;

  @resolveForTypeKey('target')
  target;
}
