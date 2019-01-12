import Component from '@ember/component';
import { scheduleOnce } from '@ember/runloop';

export default Component.extend({
  didInsertElement () {
    this._super(...arguments);
    scheduleOnce('afterRender', this, this.setOverflow);
  },

  setOverflow () {
    let table = this.$()[0];
    let view = table.scrollHeight + 'px';

    this.set('overflow', `height:${view}`);
  },

  actions: {
    quickScroll () {
      this.$()[0].scrollLeft = this.$()[0].scrollWidth;
    }
  }
});
