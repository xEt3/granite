import Component from '@glimmer/component';
import { A } from '@ember/array';

export default class ListItemAssignedAssetItemComponent extends Component {
  constructor () {
    super(...arguments);
    this.details = this.args.showAttributes;
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

  get assignment () {
    let assetAssignments = this.args.asset.assignments;
    return assetAssignments.findBy('employee.id', this.args.employee.id);
  }
}
