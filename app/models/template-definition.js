import classic from 'ember-classic-decorator';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';

@classic
export default class TemplateDefinition extends Model {
  @attr('string')
  key;

  @attr('string')
  title;

  @attr('string')
  description;

  @attr('array')
  availableData;

  @attr('array')
  contentKeys;

  @attr('boolean')
  isRenderable;

  @attr('string')
  category;

  @attr('date', { defaultValue: () => new Date() })
  created;
}
