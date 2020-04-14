import classic from 'ember-classic-decorator';
import { classNames } from '@ember-decorators/component';
import { computed } from '@ember/object';
import Component from '@ember/component';
import Base from 'semantic-ui-ember/mixins/base';

@classic
@classNames('ui', 'calendar')
export default class UiCalendar extends Component.extend(Base) {
  module = 'calendar';

  @computed('elementId')
  get calendarId() {
    return `${this.get('elementId')}__calendar`;
  }

  init() {
    super.init(...arguments);
    this.set('value', this.get('dateValue'));
  }
}


/* Usage

{{ui-calendar
  class="field"
  inline=true    **optional
  startMode="year"  **or month
  type="date"
  dateValue=model.dateOfBirth
  label="filler label text"
  placeholder="filler placeholder text" **optional
  onChange=(action (mut model.dateOfBirth))}}
*/
