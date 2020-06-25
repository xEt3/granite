import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class CensusDryRunEmployeeRelationship extends Component {
  @service store
  @tracked relationship

  constructor () {
    super(...arguments);

    this.setRelationship();
  }

  async setRelationship () {
    let key = this.args.key,
        value = this.args.value,
        field = this.args.availableFields.findBy('path', key) || {};

    if (field.isRelationship) {
      if (key === 'supervisor') {
        //change to employee because no supervisor model
        key = 'employee';
      }
      //if value is object, set value because its a supervisor in the local upload
      this.relationship = typeof value === 'object' ? value : await this.store.findRecord(key, value);
    }

    return false;
  }
}
