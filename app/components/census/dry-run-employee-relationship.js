import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Component.extend({
  store: service(),

  relationship: computed('availableFields', 'key', 'value', function () {
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
  })
});
