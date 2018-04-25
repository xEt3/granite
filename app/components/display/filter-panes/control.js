import Component from '@ember/component';
import { computed } from '@ember/object';

const ControlComponent = Component.extend({
  classNames: [ 'ui', 'field' ],
  hasNull: true,

  isSelect: computed.equal('type', 'select'),

  didInsertElement () {
    this._super(...arguments);

    if (this.get('state') && !this.get('parentView.active')) {
      this.set('parentView.active', true);
    }
  },

  selectionClass: computed('isSelect', 'searchable', function () {
    if (!this.get('isSelect')) {
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
