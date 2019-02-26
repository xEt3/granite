import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { hasMany, belongsTo } from 'ember-data/relationships';
import { computed } from '@ember/object';
import { A } from '@ember/array';
import moment from 'moment';
import hexToRgb from 'granite/utils/hex-to-rgb';
import Validations from './validations/company';

export default Model.extend(Validations,  {
  name:  attr('string'),
  email: attr('string'),

  addressLine1:   attr('string'),
  addressLine2:   attr('string'),
  addressCity:    attr('string'),
  addressState:   attr('string'),
  addressZipCode: attr('string'),

  contactPhone:      attr('string'),
  contactExtension:  attr('string'),
  contactFirstName:  attr('string'),
  contactMiddleName: attr('string'),
  contactLastName:   attr('string'),

  deactivatedOn: attr('Date'),
  reactivatedOn: attr('Date'),

  linkedServices:             attr('array'),
  employeeCustomFields:       attr('array'),
  correctiveActionSeverities: hasMany('corrective-action-severity'),
  tz:                         attr('string', { defaultValue: () => moment.tz.guess() }),

  logo: belongsTo('file', {
    async:   true,
    inverse: null
  }),
  logoUrl:           attr('string'),
  logoDominantColor: attr('string'),
  logoPalette:       attr('array'),

  rgbPalette: computed('logoPalette', function () {
    const palette = this.get('logoPalette');
    return palette && palette.length ? palette.map(hexToRgb) : false;
  }),

  firstStepsCompletedOn: attr('date'),
  firstStepsCompleted:   attr('array', { defaultValue: () => A() }),

  urlPrefix:  attr('string'),
  collectEEO: attr('boolean'),
  collectAA:  attr('boolean'),

  linkedToSlate: computed('linkedServices.[]', function () {
    let services = this.get('linkedServices');
    return services ? services.includes('slate') : false;
  })
});
