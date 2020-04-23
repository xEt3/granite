import Component from '@glimmer/component';
import { action } from '@ember/object';
import { scheduleOnce } from '@ember/runloop';
import $ from 'jquery';

export default class DisplayVisualOverflowTable extends Component {
  constructor () {
    super(...arguments);
    scheduleOnce('afterRender', this, this.setOverflow);
  }

  @action
  setOverflow () {
    let table = $('table')[0];
    let view = table.scrollHeight + 'px';

    this.overflow = `height:${view}`;
  }

  @action
  quickScroll () {
    $()[0].scrollLeft = this.$()[0].scrollWidth;
  }
}
