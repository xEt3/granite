import Component from '@ember/component';
import { computed } from '@ember/object';
import { A } from '@ember/array';

export default Component.extend({
  classNames: [ 'item' ],
  didReceiveAttrs () {
    this.set('details', this.get('showAttributes'));
  },

  attributes: computed('asset.customFields', function () {
    let fields = this.get('asset.customFields'),
        attributes = A();

    for (let key in fields) {
      if (!fields.hasOwnProperty(key)) {
        continue;
      }

      attributes.pushObject({
        key,
        value: fields[key]
      });
    }

    return attributes;
  }),

  actions: {

    delete () {
      this.get('onDelete')(this.get('asset'));
    },

    removeDocument (document) {
      let asset = this.get('asset');
      asset.documents.removeObject(document);
      this.get('saveStockItem')();
    },

    toggleProperty (prop) {
      this.toggleProperty(prop);
    }
  }
});
