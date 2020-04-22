import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

export default class CensusDryRunEmployeeRelationship extends Component {
  @service store

  get relationship () {
    let key = this.args.key,
        value = this.args.value,
        field = this.args.availableFields.findBy('path', key) || {};

    if (field.isRelationship) {
      if (key === 'supervisor') {
        //change to employee because no supervisor model
        key = 'employee';
      }
      //if value is object, return value because its a supervisor in the local upload
      return typeof value === 'object' ? value : this.store.findRecord(key, value);
    }

    return false;
  }
}
