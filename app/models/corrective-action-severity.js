import classic from 'ember-classic-decorator';
import { computed } from '@ember/object';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';

@classic
export default class CorrectiveActionSeverity extends Model {
  @attr('string')
  name;

  @attr('number')
  order;

  @attr('boolean')
  formal;

  @attr('date', { defaultValue: () => new Date() })
  created;

  @computed('name', 'order')
  get title() {
    return `${this.get('name')} (${this.get('order')})`;
  }
}
