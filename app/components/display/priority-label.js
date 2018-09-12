import Component from '@ember/component';
import { computed } from '@ember/object';

const priorityMap = [ 'Lowest', 'Low', 'Medium', 'High', 'Highest' ],
      priorityColorMap = [ '', 'grey', 'teal', 'red', 'orange' ];

let PriorityLabelComponent = Component.extend({
  tagName:           'span',
  classNames:        [ 'ui' ],
  classNameBindings: [ 'priorityColor' ],

  priorityText: computed('priority', function () {
    return priorityMap[this.get('priority') - 1] || '';
  }),

  priorityColor: computed('priority', function () {
    let color = priorityColorMap[this.get('priority') - 1] || '';
    return this.get('hasBlock') ? color : color + ' label';
  })
});

PriorityLabelComponent.reopenClass({ positionalParams: [ 'priority' ] });

export default PriorityLabelComponent;
/* Usage
  Inline:
  {{display/priority-label priority}}
  Block:
  {{#display/priority-label priority as |priority text color|}}
    Hey, the priority is {{text}} (#{{priority}}) with color of {{color}}
  {{/display/priority-label}}
*/
