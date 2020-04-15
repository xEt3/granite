import classic from 'ember-classic-decorator';
import { classNames, classNameBindings, tagName } from '@ember-decorators/component';
import { computed } from '@ember/object';
import Component from '@ember/component';

const priorityMap = [ 'Lowest', 'Low', 'Medium', 'High', 'Highest' ],
      priorityColorMap = [ '', 'grey', 'teal', 'red', 'orange' ];

@classic
@tagName('span')
@classNames('ui')
@classNameBindings('priorityColor')
class PriorityLabelComponent extends Component {
  @computed('priority')
  get priorityText() {
    return priorityMap[this.priority - 1] || '';
  }

  @computed('priority')
  get priorityColor() {
    let color = priorityColorMap[this.priority - 1] || '';
    return this.hasBlock ? color : color + ' label';
  }
}

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
