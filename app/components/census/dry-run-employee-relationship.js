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
      return this.get('store').findRecord(key, value);
    }
  })
});
