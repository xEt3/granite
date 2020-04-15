import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import Component from '@ember/component';
import { scheduleOnce } from '@ember/runloop';

@classic
export default class VisualOverflowTable extends Component {
  didInsertElement () {
    super.didInsertElement(...arguments);
    scheduleOnce('afterRender', this, this.setOverflow);
  }

  setOverflow () {
    let table = this.$('table')[0];
    let view = table.scrollHeight + 'px';

    this.set('overflow', `height:${view}`);
  }

  @action
  quickScroll () {
    this.$()[0].scrollLeft = this.$()[0].scrollWidth;
  }
}
