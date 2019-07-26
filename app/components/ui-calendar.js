import Component from '@ember/component';
import Base from 'semantic-ui-ember/mixins/base';
import { computed } from '@ember/object';

export default Component.extend(Base, {
  module:     'calendar',
  classNames: [ 'ui', 'calendar' ],

  calendarId: computed('elementId', function () {
    return `${this.get('elementId')}__calendar`;
  }),

  init () {
    this._super(...arguments);
    this.set('value', this.get('dateValue'));
  }
});


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
