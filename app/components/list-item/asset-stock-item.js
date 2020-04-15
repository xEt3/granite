import Component from '@ember/component';
import { computed } from '@ember/object';
import { A } from '@ember/array';

export default Component.extend({
  classNames: [ 'item' ],
  didReceiveAttrs () {
    this.set('details', this.showAttributes);
  },

  attributes: computed('asset.customFields', function () {
    let fields = this.get('asset.customFields'),
        attributes = A();

    for (let key in fields) {
      if (!Object.prototype.hasOwnProperty.call(fields, key)) {
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
      this.onDelete(this.asset);
    },

    removeDocument (document) {
      let asset = this.asset;
      asset.documents.removeObject(document);
      this.saveStockItem();
    },

    toggleProperty (prop) {
      this.toggleProperty(prop);
    }
  }
});
