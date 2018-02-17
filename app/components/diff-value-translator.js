/*
  Ported from slate-payroll with a big shoutout to the notorious J.S.C.
*/
import moment from 'moment';
import Component from '@ember/component';
import { computed, get } from '@ember/object';
import { inject as service } from '@ember/service';
import Employee from '../models/employee';

export default Component.extend({
  tagName: 'span',
  displayMap: {
    company: 'name',
    location: 'name',
    department: 'name',
    employee: 'fullName',
    'company-user': 'fullName'
  },
  store: service(),

  isRelationship: computed.bool('coercionType.model'),

  displayKey: computed('displayMap', 'coercionType.model', function () {
    const model = this.get('coercionType.model');
    return model ? this.get('displayMap.' + model) : undefined;
  }),

  coercionType: computed(function () {
    const attributeKinds   = get(Employee, 'fields'),
          changed          = this.get('pathForChange'),
          transformedAttrs = get(Employee, 'transformedAttributes');

    let coercion;

    attributeKinds.forEach((type, field) => {
      if ( changed === field ) {
        let transform = transformedAttrs.get(field);
        coercion = { type, transform };
        if ( coercion.type === 'belongsTo' ) {
          coercion.model = get(Employee.typeForRelationship(field, this.get('store')), 'modelName');
        }
      }
    });

    return coercion;
  }),

  pathForChange: computed('key', function () {
    const changed = this.get('key');
    return changed.join('.');
  }),

  computedValue: computed('coercionType', 'pathForChange', function () {
    const { value, coercionType } = this.getProperties('value', 'coercionType');

    if ( !coercionType || !value ) {
      return value;
    }

    if ( coercionType.transform === 'date' ) {
      return moment(value).format('M/D/YYYY');
    } else if ( coercionType.type === 'belongsTo' ) {
      return this.get('store').findRecord(coercionType.model, value);
    } else {
      return value;
    }
  })
});
