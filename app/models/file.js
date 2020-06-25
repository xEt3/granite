import classic from 'ember-classic-decorator';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';
import Validations from './validations/employee';

@classic
export default class File extends Model.extend(Validations) {
  @attr('string') title;

  @attr('string') description;

  @attr('string') objectPath;

  @attr('string') previewPath;

  @attr('string') extension;

  @attr('string') mimeType;

  @attr('string') url;

  @attr('string') directory;

  @attr('string') key;

  @attr() associatedData;

  @attr('array') tags;

  @attr('boolean') systemUse;

  @belongsTo('company-user', {
    async:   true,
    inverse: null
  })
  creator;

  @belongsTo('company', {
    async:   true,
    inverse: null
  })
  company;

  @belongsTo('corrective-action', {
    async:   true,
    inverse: null
  })
  correctiveAction;

  @attr('date', { defaultValue: () => new Date() }) created;
}
