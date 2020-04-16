import Component from '@glimmer/component';
import { action } from '@ember/object';
import { A } from '@ember/array';

export default class ListItemAssetStockItemComponent extends Component {
  get details () {
    return this.args.showAttributes;
  }

  get attributes () {
    let fields = this.args.asset.customFields,
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
  }

  @action
  removeDocument (document) {
    let asset = this.args.asset;
    asset.documents.removeObject(document);
    this.args.saveStockItem();
  }
}
