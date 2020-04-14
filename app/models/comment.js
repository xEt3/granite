import classic from 'ember-classic-decorator';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';
import resolveForTypeKey from '../utils/resolve-for-type-key';

@classic
export default class Comment extends Model {
  @attr('string')
  text;

  @belongsTo('employee', {
    async:   true,
    inverse: false
  })
  commenter;

  @attr('string-or-null')
  targetId;

  @attr('string-or-null')
  targetType;

  @attr('date', { defaultValue: () => new Date() })
  created;

  @resolveForTypeKey('target')
  target;
}
