import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { htmlSafe } from '@ember/string';

export default Controller.extend({
  timelineStyle: computed('timelineOffset', function () {
    let offset = this.get('timelineOffset');
    return htmlSafe(offset ? `transform: translate(0, ${offset}px);` : '');
  }),

  actions: {
    selectGroup ( selectedGroup, groupDisplayOffset, timelineOffset ) {
      this.setProperties({ selectedGroup, groupDisplayOffset, timelineOffset });
    },

    deselectGroup () {
      this.setProperties({
        selectedGroup: null,
        groupDisplayOffset: null,
        timelineOffset: null
      });
    }
  }
});
