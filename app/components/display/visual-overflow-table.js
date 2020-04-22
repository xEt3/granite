import Component from '@glimmer/component';
import { action } from '@ember/object';
import { scheduleOnce } from '@ember/runloop';

export default class DisplayVisualOverflowTable extends Component {
  constructor () {
    super(...arguments);
    scheduleOnce('afterRender', this, this.setOverflow);
  }

  setOverflow () {
    let table = this.$('table')[0];
    let view = table.scrollHeight + 'px';

    this.overflow = `height:${view}`;
  }

  @action
  quickScroll () {
    this.$()[0].scrollLeft = this.$()[0].scrollWidth;
  }
}
