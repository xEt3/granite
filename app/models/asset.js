import classic from 'ember-classic-decorator';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';

@classic
export default class Asset extends Model {
  @attr('string')
  name;

  @attr('string')
  description;

  @attr('string')
  icon;

  @attr('boolean')
  sharable;

  @attr('array')
  attributes;

  @belongsTo('company-user')
  creator;

  @belongsTo('company')
  company;

  @hasMany('file', {
    inverse: null,
    async:   true
  })
  documents;

  @attr('date', {
    defaultValue () {
      return new Date();
    }
  })
  created;
}
