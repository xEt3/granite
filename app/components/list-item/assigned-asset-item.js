import Component from '@ember/component';
import { computed } from '@ember/object';
import { A } from '@ember/array';

export default Component.extend({
  classNames: [ 'ui centered card' ],
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

  assignment: computed('asset.assignments.[]', function () {
    let assetAssignments = this.get('asset.assignments');
    return assetAssignments.findBy('employee.id', this.get('employee.id'));
  }),

  actions: {
    unassign () {
      this.onUnassign(this.asset);
    },

    toggleProperty (prop) {
      this.toggleProperty(prop);
    }
  }
});
