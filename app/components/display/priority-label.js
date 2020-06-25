import Component from '@glimmer/component';

const priorityMap = [ 'Lowest', 'Low', 'Medium', 'High', 'Highest' ],
      priorityColorMap = [ '', 'grey', 'teal', 'red', 'orange' ];

export default class DisplayPriorityLabelComponent extends Component {
  get priorityText () {
    return priorityMap[this.args.priority - 1] || '';
  }

  get priorityColor () {
    let color = priorityColorMap[this.args.priority - 1] || '';
    return this.hasBlock ? color : color + ' label';
  }
}

/* Usage
  Inline:
  <Display::PriorityLabel @priority={{priority}} />
  Block:
  <Display::PriorityLabel @priority={{priority}} as |priority text color|}}
    Hey, the priority is {{text}} (#{{priority}}) with color of {{color}}
  </Display::PriorityLabel>
*/
