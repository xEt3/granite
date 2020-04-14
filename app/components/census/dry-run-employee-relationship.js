import classic from 'ember-classic-decorator';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import Component from '@ember/component';

@classic
export default class DryRunEmployeeRelationship extends Component {
  @service
  store;

  @computed('availableFields', 'key', 'value')
  get relationship() {
    let key = this.get('key'),
        value = this.get('value'),
        field = this.get('availableFields').findBy('path', key) || {};

    if (field.isRelationship) {
      if (key === 'supervisor') {
        //change to employee because no supervisor model
        key = 'employee';
      }
      //if value is object, return value because its a supervisor in the local upload
      return typeof value === 'object' ? value : this.get('store').findRecord(key, value);
    }

    return false;
  }
}
