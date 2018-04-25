import Component from '@ember/component';
import { computed } from '@ember/object';

const ControlComponent = Component.extend({
  classNames: [ 'ui', 'field' ],
  hasNull: true,

  didInsertElement () {
    this._super(...arguments);

    if (this.get('state') && !this.get('parentView.active')) {
      this.set('parentView.active', true);
    }
  },

  selectionClass: computed('type', 'searchable', function () {
    if (this.get('type') !== 'select') {
      return;
    }

    let classText = 'selection';

    if (this.get('searchable')) {
      classText = `search ${classText}`;
    }

    return classText;
  }),

  __update (val) {
    this.get('update')(this.get('controlName'), val);
  }
});

ControlComponent.reopenClass({
  positionalParams: [ 'controlName', 'state' ]
})

export default ControlComponent;
